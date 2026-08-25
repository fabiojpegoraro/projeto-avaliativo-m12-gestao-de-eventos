import os
import uuid
import json
import requests
from datetime import datetime, timezone
from dotenv import load_dotenv
from typing import Annotated, TypedDict, Literal, Optional
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage, ToolMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.tools import tool

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()

# Obtém a URL base da API (com fallback para o padrão local)
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:3001/api")

# ==============================================================================
# SYSTEM PROMPT — Comportamento e restrições do agente
# ==============================================================================
SYSTEM_PROMPT = """Você é um assistente especializado em gestão de eventos.
Suas responsabilidades são:
- Consultar a lista de eventos cadastrados no sistema.
- Auxiliar o usuário a cadastrar novos eventos, coletando todas as informações necessárias.

Regras de comportamento:
- Responda sempre em português do Brasil.
- Seja objetivo e amigável.
- Somente execute ações relacionadas à gestão de eventos.
- Para cadastrar um evento, você DEVE coletar: nome, descrição, data/hora, local e categoria.
- A categoria deve ser uma das seguintes opções: Conferência, Workshop, Webinar, Networking, Outro.
- A data/hora deve ser uma data FUTURA no formato ISO 8601 (ex: 2026-12-01T14:00:00Z).
- Antes de finalizar o cadastro, confirme os dados com o usuário.
"""

# ==============================================================================
# ESTADO DO AGENTE
# Estado ampliado com campos para armazenar resultados das execuções paralelas
# ==============================================================================
class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    # Campos utilizados pelo fluxo paralelo de consulta de eventos
    parallel_events_data: Optional[str]   # Resultado do nó de busca na API (paralelo A)
    parallel_context_data: Optional[str]  # Resultado do nó de contexto/metadados (paralelo B)
    pending_tool_call_id: Optional[str]   # ID do tool_call aguardando resolução paralela

# ==============================================================================
# TOOLS
# ==============================================================================

@tool
def consultar_eventos() -> str:
    """
    Consulta a API para obter a lista de eventos disponíveis.
    Retorna os eventos em formato JSON como string.
    """
    # Esta tool é interceptada pelo roteador para execução paralela.
    # A lógica real de busca está em fetch_events_node e fetch_context_node.
    pass


@tool
def cadastrar_evento(
    nome: str,
    descricao: str,
    data_hora: str,
    local: str,
    categoria: Literal["Conferência", "Workshop", "Webinar", "Networking", "Outro"],
) -> str:
    """
    Cadastra um novo evento na API.
    A data_hora deve ser fornecida em formato válido, como '2026-08-15T14:00:00Z' ou '2026-08-15'.
    Retorna uma mensagem de sucesso com o ID do evento criado ou uma mensagem de erro.
    """
    try:
        payload = {
            "name": nome,
            "description": descricao,
            "dateTime": data_hora,
            "location": local,
            "category": categoria,
        }
        response = requests.post(
            f"{API_BASE_URL}/events", json=payload, timeout=(5, 30)
        )
        response.raise_for_status()
        event = response.json()
        return f"Evento '{nome}' cadastrado com sucesso! ID: {event.get('_id', 'N/A')}"
    except requests.exceptions.RequestException as e:
        return f"Erro ao cadastrar o evento na API: {str(e)}"


# ==============================================================================
# CONFIGURAÇÃO DO LLM
# ==============================================================================
llm = ChatGoogleGenerativeAI(model=os.getenv("LLM_MODEL", "gemini-2.5-flash"), temperature=0)

tools = [consultar_eventos, cadastrar_evento]
llm_with_tools = llm.bind_tools(tools)

# ==============================================================================
# NÓS DO GRAFO
# ==============================================================================

def run_llm(state: AgentState):
    """Executa o modelo para processar a conversa e decidir os próximos passos."""
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}


# ------------------------------------------------------------------------------
# FLUXO DE PARALELIZAÇÃO — Consulta de eventos em dois nós simultâneos
# ------------------------------------------------------------------------------

def parallel_fetch_router(state: AgentState):
    """
    Nó de entrada do fluxo paralelo.
    Extrai e armazena o tool_call_id para que o nó de merge possa construir
    o ToolMessage correto. Dispara dois nós filhos em paralelo (fan-out).
    """
    last_message = state["messages"][-1]
    tool_call_id = None
    for tc in last_message.tool_calls:
        if tc["name"] == "consultar_eventos":
            tool_call_id = tc["id"]
            break
    return {
        "pending_tool_call_id": tool_call_id,
        "parallel_events_data": None,
        "parallel_context_data": None,
    }


def fetch_events_node(state: AgentState):
    """
    NÓ PARALELO A — Busca os eventos reais na API REST.
    Executado simultaneamente com fetch_context_node pelo LangGraph.
    """
    try:
        response = requests.get(f"{API_BASE_URL}/events", timeout=(5, 30))
        response.raise_for_status()
        events = response.json()
        if not events:
            result = "Nenhum evento encontrado."
        else:
            result = json.dumps(events, ensure_ascii=False, indent=2)
    except requests.exceptions.RequestException as e:
        result = f"Erro ao acessar a API de eventos: {str(e)}"
    return {"parallel_events_data": result}


def fetch_context_node(state: AgentState):
    """
    NÓ PARALELO B — Gera metadados de contexto para enriquecer a resposta.
    Executado simultaneamente com fetch_events_node pelo LangGraph.
    """
    now = datetime.now(timezone.utc).strftime("%d/%m/%Y às %H:%M UTC")
    total_hint = "Dados obtidos diretamente da base de eventos do sistema."
    context = f"📅 Consulta realizada em: {now}\nℹ️  {total_hint}"
    return {"parallel_context_data": context}


def merge_parallel_results(state: AgentState):
    """
    Nó de convergência — mescla os resultados dos dois nós paralelos.
    Constrói um ToolMessage unificado para ser processado pelo agente.
    """
    events_data = state.get("parallel_events_data") or "Sem dados de eventos."
    context_data = state.get("parallel_context_data") or ""
    tool_call_id = state.get("pending_tool_call_id") or "unknown"

    # Combina os resultados dos dois ramos paralelos
    merged_content = f"{events_data}\n\n{context_data}"

    tool_msg = ToolMessage(
        content=merged_content,
        name="consultar_eventos",
        tool_call_id=tool_call_id,
    )

    # Limpa os campos de estado transitórios após o merge
    return {
        "messages": [tool_msg],
        "parallel_events_data": None,
        "parallel_context_data": None,
        "pending_tool_call_id": None,
    }


def direct_tools(state: AgentState):
    """
    Executa tools diretamente (ex: cadastrar_evento), sem paralelização.
    Utilizado para ações de escrita que não se beneficiam de fan-out.
    """
    last_message = state["messages"][-1]
    tool_map = {t.name: t for t in tools}
    tool_responses = []

    for tool_call in last_message.tool_calls:
        tool_name = tool_call["name"]
        if tool_name in tool_map and tool_name != "consultar_eventos":
            result = tool_map[tool_name].invoke(tool_call["args"])
            tool_responses.append(
                ToolMessage(
                    content=str(result),
                    name=tool_name,
                    tool_call_id=tool_call["id"],
                )
            )
    return {"messages": tool_responses}


# ==============================================================================
# ROTEAMENTO CONDICIONAL
# ==============================================================================

def should_continue(state: AgentState):
    """
    Roteia o fluxo após o nó do agente:
    - 'parallel_fetch_router' → tool consultar_eventos (execução paralela)
    - 'direct_tools'          → demais tools (execução direta)
    - END                     → sem tool calls, encerra o turno
    """
    last_message = state["messages"][-1]

    if not (hasattr(last_message, "tool_calls") and last_message.tool_calls):
        return END

    for tc in last_message.tool_calls:
        if tc["name"] == "consultar_eventos":
            return "parallel_fetch_router"

    return "direct_tools"


# ==============================================================================
# MONTAGEM DO GRAFO LANGGRAPH
# Padrão: Fan-Out → [Nó A || Nó B] → Merge → Agente
# ==============================================================================
workflow = StateGraph(AgentState)

# Nós principais
workflow.add_node("agent", run_llm)
workflow.add_node("direct_tools", direct_tools)

# Nós do fluxo paralelo
workflow.add_node("parallel_fetch_router", parallel_fetch_router)
workflow.add_node("fetch_events_node", fetch_events_node)       # Paralelo A
workflow.add_node("fetch_context_node", fetch_context_node)     # Paralelo B
workflow.add_node("merge_parallel_results", merge_parallel_results)

# Ponto de entrada
workflow.set_entry_point("agent")

# Roteamento condicional a partir do agente
workflow.add_conditional_edges(
    "agent",
    should_continue,
    {
        "parallel_fetch_router": "parallel_fetch_router",
        "direct_tools": "direct_tools",
        END: END,
    },
)

# Fan-out: parallel_fetch_router → [fetch_events_node || fetch_context_node] (paralelo)
workflow.add_edge("parallel_fetch_router", "fetch_events_node")
workflow.add_edge("parallel_fetch_router", "fetch_context_node")

# Convergência: ambos os nós paralelos → merge_parallel_results
workflow.add_edge("fetch_events_node", "merge_parallel_results")
workflow.add_edge("fetch_context_node", "merge_parallel_results")

# Após merge, retorna ao agente
workflow.add_edge("merge_parallel_results", "agent")

# Tools diretas retornam ao agente
workflow.add_edge("direct_tools", "agent")

# Compila o grafo com MemorySaver (Card #43 — memória persistente de sessão)
memory = MemorySaver()
app = workflow.compile(checkpointer=memory)

# ==============================================================================
# PONTO DE ENTRADA — CLI interativo com memória de sessão e paralelização
# ==============================================================================
if __name__ == "__main__":
    print("🤖 Agente de Eventos iniciado!")
    print("💾 Memória de sessão ativa — o agente lembrará do contexto desta conversa.")
    print("⚡ Paralelização ativa — consultas de eventos buscam dados em paralelo.")
    print("Digite 'sair' ou 'exit' para encerrar.")
    print("-" * 60)

    if not os.getenv("GOOGLE_API_KEY"):
        print("⚠️  AVISO: A variável GOOGLE_API_KEY não foi encontrada no .env.")
        print("O agente não funcionará corretamente sem ela.\n")

    # Gera um thread_id único para esta sessão (Card #43 — isolamento de contexto)
    session_id = str(uuid.uuid4())
    print(f"🔑 Thread ID da sessão: {session_id}\n")

    # Configuração do thread passada em cada invocação para recuperar o histórico
    config = {"configurable": {"thread_id": session_id}}

    # Inicializa o estado com System Prompt e campos de paralelização zerados
    initial_state = {
        "messages": [SystemMessage(content=SYSTEM_PROMPT)],
        "parallel_events_data": None,
        "parallel_context_data": None,
        "pending_tool_call_id": None,
    }
    app.invoke(initial_state, config=config)

    while True:
        try:
            user_input = input("\nVocê: ")
            if user_input.lower() in ["sair", "exit", "quit"]:
                print("Encerrando agente...")
                break

            if not user_input.strip():
                continue

            inputs = {"messages": [HumanMessage(content=user_input)]}

            # Executa o grafo com thread_id para recuperar histórico (Card #43)
            for output in app.stream(inputs, config=config, stream_mode="updates"):
                for node_name, state_update in output.items():
                    if "messages" in state_update:
                        for msg in state_update["messages"]:
                            if node_name == "agent" and msg.content:
                                if isinstance(msg.content, list):
                                    text_parts = [
                                        p.get("text", "")
                                        for p in msg.content
                                        if isinstance(p, dict) and "text" in p
                                    ]
                                    content_str = "".join(text_parts)
                                else:
                                    content_str = str(msg.content)
                                print(f"\nAgente: {content_str}")
                            elif node_name == "fetch_events_node":
                                print("⚡ [Paralelo A] Buscando eventos na API...")
                            elif node_name == "fetch_context_node":
                                print("⚡ [Paralelo B] Gerando contexto e metadados...")
                            elif node_name == "merge_parallel_results":
                                print("🔀 Mesclando resultados paralelos...")
                            elif node_name == "direct_tools":
                                print(f"🔧 (Executando ferramenta: {msg.name}...)")

        except KeyboardInterrupt:
            print("\nEncerrando agente...")
            break
        except Exception as e:
            print(f"\nErro inesperado: {str(e)}")
