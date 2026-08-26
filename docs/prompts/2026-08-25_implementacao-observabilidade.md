# Log de Prompt — Observabilidade: Logs Estruturados e Traces

**Data:** 2026-08-25  
**Tarefa:** Card #48 do Kanban — `[Observabilidade] Configurar Logs Estruturados e Traces`  
**Branch:** `feature/observabilidade`  
**Issue GitHub:** https://github.com/fabiojpegoraro/projeto-avaliativo-m12-gestao-de-eventos/issues/48

---

## Prompt Enviado pelo Usuário

> Implemente o Card #48 seguindo as mesmas orientações das implementações anteriores.

---

## Objetivo da Tarefa

Implementar observabilidade na aplicação de acordo com o requisito 4.6 do documento de avaliação. Isso envolve gerar dois sinais correlacionados: Logs Estruturados (JSON) e Traces (com cálculo de latência), permitindo investigar o fluxo de execução, decisões, erros e tempo de resposta do agente e de suas tools.

---

## Instruções de Sistema Relevantes

- **ai-rules.md:** Validar contra seção 4.6 do documento de avaliação (Observabilidade e resiliência — logs estruturados e trace correlacionado).
- **Branch:** Criar a partir de `develop`.
- **Estratégia:** Utilizar a biblioteca `logging` do Python com formatação JSON e identificadores únicos (`trace_id` e `session_id`).

---

## Decisões Técnicas

1. **Configuração de Logging Estruturado:** Utilização do módulo nativo `logging` do Python, com um formatador customizado para saídas em JSON, salvando em um arquivo `logs/agent.log`.
2. **Correlação de Sinais (Traces):** Geração de um `trace_id` (UUID) para cada fluxo de execução que é passado no `AgentState` ou recuperado do contexto. Esse `trace_id` e o `thread_id` (sessão) serão injetados em todos os logs, correlacionando as requisições.
3. **Métricas de Latência:** Adição de instrumentação de tempo (start/end) nos nós críticos (`agent`, `fetch_events_node`, chamadas HTTP) para calcular a latência em milissegundos, enriquecendo o log estruturado com dados de performance.
4. **Investigação de Execução:** Criação de um documento demonstrativo em `docs/technicalDocs/observabilidade-analise.md` que mostra a investigação de uma execução real utilizando os logs estruturados e traces gerados.
