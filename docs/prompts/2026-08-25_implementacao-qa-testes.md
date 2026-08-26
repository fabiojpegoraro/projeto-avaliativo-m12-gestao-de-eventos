# Log de Prompt — QA: Gerar e Refinar Testes Automatizados com IA

**Data:** 2026-08-25  
**Tarefa:** Card #49 do Kanban — `[QA Testes] Gerar e Refinar Testes Automatizados com IA`  
**Branch:** `feature/qa-testes`  
**Issue GitHub:** https://github.com/fabiojpegoraro/projeto-avaliativo-m12-gestao-de-eventos/issues/49

---

## Prompt Enviado pelo Usuário

> Agora, seguindo as mesma diretrizes de implementação do card anterior, vamos implementar o Card #49

---

## Objetivo da Tarefa

Implementar testes automatizados (integração) para os cenários críticos da aplicação com o apoio de IA, garantindo a validação de fluxos de alto risco (como a segurança contra prompt injection e a lógica de roteamento do LangGraph). A tarefa também exige documentar a justificativa de priorização com base em risco, impacto ou criticidade.

---

## Instruções de Sistema Relevantes

- **ai-rules.md:** Validar contra seção 4.7 do documento de avaliação (IA para QA e testes inteligentes).
  - Gerar ou refinar testes automatizados cobrindo cenários relevantes (integração).
  - Selecionar e justificar pelo menos um teste/cenário prioritário baseado em risco/criticidade.
- **Branch:** Criar a partir de `develop`.
- **Estratégia:** Utilizar `pytest` para testes de integração no módulo do agente em Python.

---

## Decisões Técnicas

1. **Escolha do Framework:** `pytest` será adicionado como dependência para execução e validação dos testes.
2. **Priorização Baseada em Risco:**
   - **Cenário Prioritário 1 (Segurança):** O `input_guard` é a primeira linha de defesa. Se falhar, o sistema está vulnerável a exfiltração de dados ou ações não autorizadas (Alto Risco, Alto Impacto).
   - **Cenário Prioritário 2 (Confiabilidade):** O roteador do fluxo de aprovação humana. Se o nó `route_after_approval` falhar, eventos poderiam ser cadastrados sem permissão (Alto Risco).
3. **Geração dos Testes:** Os testes foram concebidos com a abstração do LangGraph em mente. Em vez de testar a CLI completa, os testes invocam os nós (ex: `input_guard`) e roteadores condicionalmente injetando estados forjados (`AgentState`) para verificar saídas, simulando um teste de integração de componentes (Component Integration Test).
4. **Documentação:** Criado o artefato `docs/qa/testes-priorizados.md` documentando a justificativa baseada na matriz de risco exigida na Seção 4.7.
