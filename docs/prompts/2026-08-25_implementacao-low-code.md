# Log de Prompt — Integração Low-Code (n8n)

**Data:** 2026-08-25  
**Tarefa:** Card #52 do Kanban — `[Low-Code] Criar integração Low-Code para Notificação (n8n)`  
**Branch:** `feature/low-code`  
**Issue GitHub:** https://github.com/fabiojpegoraro/projeto-avaliativo-m12-gestao-de-eventos/issues/52

---

## Prompt Enviado pelo Usuário

> Implemente o Card #52.
> Atente para as alterações não comitadas em agent/src/main.py e agent/src/tools.py.
> Estas alterações foram feitas para corrigir problema de import ao iniciar o agente para testá-lo. Elas devem permanecer e serão comitadas na próxima branch criada.

---

## Objetivo da Tarefa

Cumprir o requisito "Integração com Plataforma Low-Code" (Seção correspondente do documento) utilizando o n8n via Docker. O Agente deve ser capaz de engatilhar um workflow de notificação de forma observável.

---

## Decisões Técnicas

1. **Gestão de Versão:**
   - Foi realizado um `git stash` antes da transição da branch para garantir que a correção de paths de importação (`from utils` vs `from src.utils`) não fosse sobrescrita, aplicando as alterações na nova branch `feature/low-code`.
2. **Nova Tool no Agente:**
   - Criada a tool `notificar_equipe` em `agent/src/tools.py`. Essa tool é exposta ao modelo Gemini. Se o usuário pedir "Avise a equipe que o banco de dados caiu", o Agente saberá despachar um JSON via Webhook para a URL do n8n.
   - Foram usados timeouts curtos (`3s` connect / `5s` read) pois o disparo de webhook (notificação) não deve ser impeditivo para a velocidade de resposta do agente interativo.
3. **Workflow do n8n:**
   - Foi construído e exportado o arquivo `docs/n8n-webhook-workflow.json`. Ele define o "Gatilho" (Webhook recebendo POST na rota `/webhook/novo-evento`), e "Ações" simuladas (Formatação e envio de alerta para um nó do Slack).
4. **Documentação:**
   - O `README.md` foi atualizado ensinando explicitamente como instanciar o n8n via Docker, pular configurações e importar o JSON deste repositório para testar o _flow_.
