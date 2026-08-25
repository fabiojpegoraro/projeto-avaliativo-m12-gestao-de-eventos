# Log de Prompt — Implementação de Memória Persistente (Checkpointer)

**Data:** 2026-08-24  
**Tarefa:** Card #43 do Kanban — `[Agente] Implementar Memória Persistente (Checkpointer)`  
**Branch:** `feature/memoria-persistente`  
**Issue GitHub:** https://github.com/fabiojpegoraro/projeto-avaliativo-m12-gestao-de-eventos/issues/43

---

## Prompt Enviado pelo Usuário

> Você é um desenvolvedor sênior, com forte experiência em AI Engineering, uso de LangGraph para compartilhamento de estados, e uso de IA para apoiar no desenvolvimento de soluções para segurança, observabilidade, testes, DevOps e SRE.
>
> Contexto: Vamos dar continuidade no desenvolvimento do projeto atual, adicionando funcionalidades de acordo com os cards já criados no quadro Kanban do projeto https://github.com/users/fabiojpegoraro/projects/2.
>
> Objetivo: Implementar as tasks disponíveis no quadro Kanban do projeto citado, na ordem já priorizada e seguindo as diretrizes dispostas em `ai-rules.md`.
>
> Escopo desta sessão: Executar estritamente o Card #43 — Implementar Memória Persistente (Checkpointer) no agente LangGraph.

---

## Objetivo da Tarefa

Adicionar `MemorySaver` ao LangGraph para que o agente mantenha o contexto histórico entre perguntas consecutivas no terminal, dentro de uma mesma sessão, utilizando um `thread_id` único por sessão.

---

## Instruções de Sistema Relevantes

- **ai-rules.md:** Validar implementação contra os requisitos de `docs/projetoAvaliativoM2.2/projetoAvaliativo-m2.2.md` (seção 4.4 — Memória, contexto e RAG).
- **Segurança:** Não versionar `.env` ou chaves. Usar apenas `.env.example`.
- **Commits:** Semânticos e incrementais.
- **Branches:** Criar a partir de `develop`.

---

## Decisões Técnicas

1. **MemorySaver (in-memory):** Escolhido por ser suficiente para o requisito de memória de curto prazo dentro de uma sessão de terminal. Não requer infraestrutura adicional (SQLite/Redis), mantendo a simplicidade de instalação e execução local.
2. **thread_id por sessão:** Um UUID é gerado a cada inicialização do script. Isso garante isolamento entre sessões distintas, mas mantém contexto durante a sessão ativa — exatamente o comportamento descrito na issue.
3. **Manutenção do System Prompt:** Um `SystemMessage` será adicionado à primeira mensagem do grafo para estabelecer o comportamento do agente de forma persistente no contexto histórico.
