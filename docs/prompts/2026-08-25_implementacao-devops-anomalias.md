# Log de Prompt — DevOps Inteligente e SRE

**Data:** 2026-08-25  
**Tarefa:** Card #50 do Kanban — `[DevOps/SRE] Configurar Pipeline e Analisar logs com IA`  
**Branch:** `feature/devops-anomalias`  
**Issue GitHub:** https://github.com/fabiojpegoraro/projeto-avaliativo-m12-gestao-de-eventos/issues/50

---

## Prompt Enviado pelo Usuário

> Inicie a implementação do Card #50

---

## Objetivo da Tarefa

Cumprir o requisito 4.8 (DevOps inteligente e detecção de falhas) configurando um pipeline de CI básico (Lint + Testes), e produzindo uma análise assistida por IA que interprete logs dessas etapas. Adicionalmente, detectar e explicar uma anomalia simulada no agente, calculando risco e probabilidade de falha, documentando tudo com evidências.

---

## Instruções de Sistema Relevantes

- **ai-rules.md:** Validar contra seção 4.8.
  - Pipeline de CI/CD (Lint, Testes).
  - Análise de logs de 2 etapas.
  - Detecção de 1 anomalia.
  - Estimativa de risco/probabilidade.
- **Branch:** Criar a partir de `develop`.

---

## Decisões Técnicas

1. **Pipeline de CI (GitHub Actions):** Criação de `.github/workflows/ci.yml` focado no ecossistema Python do agente. O pipeline rodará em paralelo (ou sequencialmente) a instalação de dependências, o linter `flake8` (adicionado ao requirements) e os testes automatizados (`pytest`).
2. **Análise de Logs com IA:** Foi simulada uma análise inteligente de falhas no linting e nos testes. A documentação (`docs/qa/analise-anomalias.md`) consolida a explicação de por que os erros ocorreram (ex: imports não utilizados detectados pelo flake8, falha de timeout nos testes).
3. **Anomalia e Risco (SRE):** Como o agente gerencia eventos (sistema crítico), a anomalia simulada foi "Pico de Latência seguido de Timeout (HTTP 504) na API de Eventos". 
   - *Tendência:* Simulação aponta aumento linear na latência nos últimos 7 dias.
   - *Probabilidade de falha:* Risco alto (85%) de indisponibilidade no próximo fim de semana se o banco de dados não for indexado ou escalado, dado o tempo de resposta crescente.
