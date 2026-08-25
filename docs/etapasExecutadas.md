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
