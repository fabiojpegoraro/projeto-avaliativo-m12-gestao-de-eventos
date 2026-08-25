# Log de Prompt — Human-in-the-Loop (Aprovação Humana)

**Data:** 2026-08-24  
**Tarefa:** Card #45 do Kanban — `[Governança] Implementar Aprovação Humana (Human-in-the-Loop)`  
**Branch:** `feature/human-in-the-loop`  
**Issue GitHub:** https://github.com/fabiojpegoraro/projeto-avaliativo-m12-gestao-de-eventos/issues/45

---

## Prompt Enviado pelo Usuário

> Vamos seguir para o terceiro card a ser implementado. Considere a mesma persona, contexto, objetivo, etapas e restrições de segurança para seguir com a implementação do próximo card.

---

## Objetivo da Tarefa

Fazer com que a tool `cadastrar_evento` (ação de escrita/destrutiva) seja interrompida pelo LangGraph e aguarde um "Y/N" do usuário no terminal antes de efetivar no backend. Ações de leitura (`consultar_eventos`) não devem ser afetadas.

---

## Instruções de Sistema Relevantes

- **ai-rules.md:** Validar contra seção 4.5 do documento de avaliação (Segurança, governança e limites de autonomia).
- **Segurança:** Não versionar `.env`. Ações destrutivas condicionadas à aprovação humana.
- **Branch:** Criar a partir de `develop`.

---

## Decisões Técnicas

1. **`interrupt()` do LangGraph:** Utilizada a API nativa `interrupt()` de `langgraph.types` para pausar o grafo no nó `human_approval`. A execução fica suspensa até o CLI retomar com `Command(resume=valor)`. Evita threading manual ou polling.

2. **Nó dedicado `human_approval`:** Centraliza toda a lógica de interrupção e captura do tool_call pendente. Retorna o contexto do evento e a resposta do usuário ao estado antes de rotear condicionalmente.

3. **Roteamento pós-aprovação (`route_after_approval`):** Edge condicional decide entre `execute_approved_tool` (S/Y) e `cancel_tool` (N). Ambos constroem um `ToolMessage` com o `tool_call_id` correto, garantindo que o LLM receba feedback adequado independentemente da decisão.

4. **Helper `stream_graph()`:** O loop do CLI foi refatorado em uma função que trata interrupts de forma natural — ao detectar `__interrupt__` no stream, exibe os dados do evento, captura a entrada do usuário e retoma com `Command(resume=...)`. Evita código duplicado e suporta múltiplas interrupções encadeadas.

5. **`pending_approval_tool_call`:** O tool_call completo (incluindo `id`) é preservado no estado para que `execute_approved_tool` e `cancel_tool` possam construir o `ToolMessage` com o ID correto.
