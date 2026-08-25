# Log de Prompt — Cenário Adversarial (Prompt Injection)

**Data:** 2026-08-25  
**Tarefa:** Card #46 do Kanban — `[Segurança] Configurar e Demonstrar Cenário Adversarial (Prompt Injection)`  
**Branch:** `feature/seguranca-adversarial`  
**Issue GitHub:** https://github.com/fabiojpegoraro/projeto-avaliativo-m12-gestao-de-eventos/issues/46

---

## Prompt Enviado pelo Usuário

> Considerando a mesma persona, contexto, objetivo, etapas e restrições de segurança, vamos implementar o Card #46. Tentei rodar o agente para testar a implementação do card anterior e ocorreu um erro. A correção foi feita e já está no histórico do arquivo main.py. Mantenha essa alteração, pois comitaremos ela junto na branch criada para o Card #46.

---

## Objetivo da Tarefa

Criar regras e restrições no System Prompt do agente para evitar que entradas maliciosas executem ações indevidas ou sobrescrevam o comportamento. Adicionar um nó de sanitização de entrada (`input_guard`) como defesa em profundidade. Documentar uma tentativa de prompt injection que foi bloqueada pelo agente.

---

## Instruções de Sistema Relevantes

- **ai-rules.md:** Validar contra seção 4.5 do documento de avaliação — Implementar e demonstrar pelo menos um cenário adversarial envolvendo prompt injection ou entrada não confiável.
- **Segurança:** Não versionar `.env`. Não versionar dados sensíveis.
- **Branch:** Criar a partir de `develop` (incluindo correção do `first_turn`).

---

## Decisões Técnicas

1. **Hardening do System Prompt:** Adicionadas regras explícitas de anti-injection diretamente no `SYSTEM_PROMPT`. Regras declaradas claramente: ignorar tentativas de override de instrução, não revelar o system prompt, não sair do escopo de gestão de eventos, não executar código arbitrário.

2. **Nó `input_guard` (defesa em profundidade):** Adicionado nó dedicado à entrada do grafo que analisa o input do usuário antes de chegar ao LLM. Detecta padrões comuns de prompt injection (ex: "ignore as instruções", "aja como", "novo papel") e bloqueia a execução retornando uma mensagem de rejeição — sem enviar a entrada maliciosa ao modelo.

3. **Lista de padrões suspeitos:** Lista de regex/strings configurável no código, documentada e comentada, aplicada de forma case-insensitive sobre a entrada do usuário.

4. **Documentação do cenário adversarial:** Criado `docs/qa/cenario-adversarial.md` com evidências textuais das tentativas de ataque, o comportamento esperado e o comportamento obtido (bloqueio).

5. **Correção `first_turn` incluída nesta branch:** A correção que remove o `app.invoke()` inicial e usa flag `first_turn` para injetar `SystemMessage` + `HumanMessage` juntos na primeira mensagem foi testada com sucesso pelo usuário e é comitada nesta branch junto com o Card #46.
