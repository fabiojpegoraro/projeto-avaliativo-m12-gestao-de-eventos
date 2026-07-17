import os
import json
import requests
from dotenv import load_dotenv
from typing import Annotated, TypedDict, Literal
from langchain_core.messages import BaseMessage, HumanMessage, ToolMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langchain_core.tools import tool

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()

# Obtém a URL base da API (com fallback para o padrão local)
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:3001/api")

# Definindo o estado do Agente
class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]

# Definindo a Tool de Consulta de Eventos
@tool
def consultar_eventos() -> str:
    """
    Consulta a API para obter a lista de eventos disponíveis.
    Retorna os eventos em formato JSON como string.
    """
    try:
        response = requests.get(f"{API_BASE_URL}/events")
        response.raise_for_status()
        events = response.json()
        
        if not events:
            return "Nenhum evento encontrado."
            
        return json.dumps(events, ensure_ascii=False, indent=2)
    except requests.exceptions.RequestException as e:
        return f"Erro ao acessar a API de eventos: {str(e)}"

# Definindo a Tool de Cadastro de Eventos
@tool
def cadastrar_evento(nome: str, descricao: str, data_hora: str, local: str, categoria: Literal["Conferência", "Workshop", "Webinar", "Networking", "Outro"]) -> str:
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
            "category": categoria
        }
        response = requests.post(f"{API_BASE_URL}/events", json=payload)
        response.raise_for_status()
        event = response.json()
        return f"Evento '{nome}' cadastrado com sucesso! ID: {event.get('_id', 'N/A')}"
    except requests.exceptions.RequestException as e:
        return f"Erro ao cadastrar o evento na API: {str(e)}"

# Configurando o LLM com o LangChain
# Importante: Requer a variável GOOGLE_API_KEY no arquivo .env
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)

# Vinculando as tools ao modelo
tools = [consultar_eventos, cadastrar_evento]
llm_with_tools = llm.bind_tools(tools)

# Função para executar o LLM
def run_llm(state: AgentState):
    """Executa o modelo para processar a conversa atual e decidir os próximos passos."""
    messages = state["messages"]
    response = llm_with_tools.invoke(messages)
    return {"messages": [response]}

# Função para executar as tools
def run_tools(state: AgentState):
    """Executa as ferramentas caso o LLM solicite."""
    messages = state["messages"]
    last_message = messages[-1]
    
    tool_responses = []
    tool_map = {t.name: t for t in tools}
    
    for tool_call in last_message.tool_calls:
        if tool_call["name"] in tool_map:
            # Executa a tool
            tool_func = tool_map[tool_call["name"]]
            result = tool_func.invoke(tool_call["args"])
            tool_responses.append(
                ToolMessage(
                    content=str(result),
                    name=tool_call["name"],
                    tool_call_id=tool_call["id"],
                )
            )
    return {"messages": tool_responses}

# Função de roteamento condicional
def should_continue(state: AgentState):
    """Verifica se o LLM solicitou a execução de alguma tool, ou se deve finalizar."""
    messages = state["messages"]
    last_message = messages[-1]
    
    # Se houver tool_calls, vai para o nó de tools
    if hasattr(last_message, 'tool_calls') and last_message.tool_calls:
        return "tools"
    # Caso contrário, finaliza a execução
    return END

# Montando o Grafo do LangGraph
workflow = StateGraph(AgentState)

# Adiciona os nós
workflow.add_node("agent", run_llm)
workflow.add_node("tools", run_tools)

# Define o fluxo
workflow.set_entry_point("agent")
workflow.add_conditional_edges(
    "agent",
    should_continue,
    {
        "tools": "tools",
        END: END
    }
)
workflow.add_edge("tools", "agent")

# Compila o grafo
app = workflow.compile()

# Ponto de entrada para testar o agente via terminal
if __name__ == "__main__":
    print("🤖 Agente de Eventos iniciado!")
    print("Digite 'sair' ou 'exit' para encerrar.")
    print("-" * 50)
    
    if not os.getenv("GOOGLE_API_KEY"):
        print("⚠️ AVISO: A variável GOOGLE_API_KEY não foi encontrada no .env.")
        print("O agente não funcionará corretamente sem ela.\n")
        
    while True:
        try:
            user_input = input("\nVocê: ")
            if user_input.lower() in ['sair', 'exit', 'quit']:
                print("Encerrando agente...")
                break
                
            if not user_input.strip():
                continue
                
            inputs = {"messages": [HumanMessage(content=user_input)]}
            
            # Executa o grafo do LangGraph mostrando apenas a resposta final do agente
            for output in app.stream(inputs, stream_mode="updates"):
                for node_name, state_update in output.items():
                    if "messages" in state_update:
                        for msg in state_update["messages"]:
                            if node_name == "agent" and msg.content:
                                # Trata o retorno em formato de blocos (lista de dicionários)
                                if isinstance(msg.content, list):
                                    text_parts = [p.get("text", "") for p in msg.content if isinstance(p, dict) and "text" in p]
                                    content_str = "".join(text_parts)
                                else:
                                    content_str = str(msg.content)
                                print(f"\nAgente: {content_str}")
                            elif node_name == "tools":
                                print(f"🔧 (Acessando ferramenta: {msg.name}...)")
        except KeyboardInterrupt:
            print("\nEncerrando agente...")
            break
        except Exception as e:
            print(f"\nErro inesperado: {str(e)}")
