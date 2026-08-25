# Etapas Executadas — Projeto Avaliativo M2.2

Este arquivo registra as tarefas implementadas no projeto, relacionando cada uma à sua branch, issue no GitHub e às decisões técnicas relevantes.

---

## Card #43 — `[Agente] Implementar Memória Persistente (Checkpointer)`

- **Branch:** `feature/memoria-persistente`
- **Issue:** https://github.com/fabiojpegoraro/projeto-avaliativo-m12-gestao-de-eventos/issues/43
- **Data de execução:** 2026-08-24
- **Requisito atendido:** Seção 4.4 do documento de avaliação (Memória, contexto e RAG)

### O que foi feito

Adicionado `MemorySaver` (checkpointer in-memory) ao grafo LangGraph, permitindo que o agente mantenha o histórico de mensagens entre perguntas consecutivas durante uma mesma sessão de terminal.

### Arquivos modificados

| Arquivo | Alteração |
|---------|-----------|
| `agent/src/main.py` | Refatoração completa: adição do `MemorySaver`, `SystemMessage` com regras do agente, `thread_id` por sessão via `uuid4()`, `config` passado em cada invocação do grafo |
| `agent/requirements.txt` | Adicionado `langgraph-checkpoint` |
| `agent/.env.example` | Adicionada variável `LLM_MODEL` para configurar o modelo via ambiente |
| `docs/prompts/2026-08-24_implementacao-memoria-persistente.md` | Log do prompt e decisões técnicas |

### Decisões técnicas

1. **`MemorySaver` (in-memory):** Escolhido por ser suficiente para o requisito de memória de curto prazo (por sessão). Não requer infraestrutura adicional (SQLite/Redis), mantendo a simplicidade de instalação local. Para persistência entre sessões distintas, seria necessário `SqliteSaver` ou `AsyncPostgresSaver` — evolução natural para cards futuros.

2. **`thread_id` por sessão via `uuid4()`:** Um UUID único é gerado a cada inicialização do script. Isso garante:
   - **Isolamento:** Sessões distintas não compartilham contexto.
   - **Continuidade:** Dentro da mesma sessão, todas as perguntas do usuário têm acesso ao histórico completo.

3. **`SystemMessage` na primeira invocação:** O System Prompt é injetado como `SystemMessage` na primeira chamada ao grafo. Por ser parte do estado persistido pelo `MemorySaver`, ele permanece no contexto durante toda a sessão sem precisar ser reenviado.

4. **`LLM_MODEL` como variável de ambiente:** Permite trocar o modelo (ex: `gemini-1.5-pro`, `gemini-2.5-flash`) sem alterar o código-fonte, atendendo ao requisito 4.10 do documento de avaliação.

5. **`timeout=(5, 30)` nas chamadas HTTP:** Adicionado preventivamente para preparar a base da resiliência (Card #47 futuro).

### Como testar

```bash
cd agent
source venv/bin/activate   # ou .\venv\Scripts\activate no Windows
cp .env.example .env       # e preencha GOOGLE_API_KEY
python src/main.py
```

O agente exibirá o `Thread ID` da sessão. Faça duas perguntas relacionadas para verificar que ele mantém o contexto (ex: "Quais eventos existem?" → "Me diga mais sobre o primeiro").

---

## Card #44 — `[Agente] Adicionar fluxo de Paralelização Simples`

- **Branch:** `feature/paralelizacao-agente`
- **Issue:** https://github.com/fabiojpegoraro/projeto-avaliativo-m12-gestao-de-eventos/issues/44
- **Data de execução:** 2026-08-24
- **Requisito atendido:** Seção 4.2 do documento de avaliação (Arquitetura agêntica e LangGraph — paralelização simples)

### O que foi feito

Implementado o padrão **fan-out paralelo** nativo do LangGraph. Quando o agente decide chamar `consultar_eventos`, o grafo agora roteia para um nó de entrada do fluxo paralelo (`parallel_fetch_router`) que dispara dois nós simultaneamente:

- **Nó A — `fetch_events_node`:** Realiza a chamada real à API REST do backend e retorna os eventos em JSON.
- **Nó B — `fetch_context_node`:** Gera metadados de contexto (timestamp da consulta, informações auxiliares).

Ambos os nós convergem em `merge_parallel_results`, que mescla os resultados em um único `ToolMessage` antes de retornar ao agente.

```
agent → parallel_fetch_router ─┬→ fetch_events_node  ─┐
                                └→ fetch_context_node ─┴→ merge_parallel_results → agent
```

Para `cadastrar_evento` (e outras tools futuras), o fluxo permanece direto via `direct_tools`.

### Arquivos modificados

| Arquivo | Alteração |
|---------|-----------|
| `agent/src/main.py` | Adição de 4 novos nós (`parallel_fetch_router`, `fetch_events_node`, `fetch_context_node`, `merge_parallel_results`), ampliação do `AgentState` com campos de paralelização, roteamento condicional com 3 caminhos, indicadores visuais no CLI |
| `docs/prompts/2026-08-24_implementacao-paralelizacao-agente.md` | Log do prompt e decisões técnicas |

### Decisões técnicas

1. **Fan-out via edges duplas do LangGraph:** O padrão mais idiomático para paralelização no LangGraph é adicionar duas edges saindo do mesmo nó-fonte (`parallel_fetch_router`). O runtime executa ambos os nós filhos em paralelo e espera ambos completarem antes de avançar ao nó de merge — sem nenhum código de threading ou asyncio necessário.

2. **Estado transitório para coordenação:** Os campos `parallel_events_data`, `parallel_context_data` e `pending_tool_call_id` são campos temporários do `AgentState`. São zerados (`None`) após o merge para manter o estado limpo entre turnos, evitando contaminação de contexto em perguntas subsequentes.

3. **`pending_tool_call_id`:** O `ToolMessage` do LangChain requer o `tool_call_id` correspondente ao `tool_calls` da mensagem do LLM. O `parallel_fetch_router` captura esse ID e o propaga no estado para que `merge_parallel_results` possa construir o `ToolMessage` correto sem acesso à mensagem original.

4. **Separação de concerns:** `consultar_eventos` (leitura, paralela) e `cadastrar_evento` (escrita, direta) seguem caminhos distintos, mantendo a clareza arquitetural e preparando a base para o Human-in-the-Loop do Card #45 (que afetará apenas o caminho de escrita).

5. **Compatibilidade com Card #43:** `MemorySaver`, `thread_id` e `SystemMessage` mantidos integralmente. O estado ampliado é inicializado com `None` nos campos de paralelização.

### Como testar

```bash
cd agent
source venv/bin/activate
python src/main.py

# Quando o agente consultar eventos, você verá:
# ⚡ [Paralelo A] Buscando eventos na API...
# ⚡ [Paralelo B] Gerando contexto e metadados...
# 🔀 Mesclando resultados paralelos...
```
