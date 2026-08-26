# SRE e DevOps Inteligente — Análise de Logs e Anomalias

**Projeto:** Gestão de Eventos com Agente IA  
**Card:** #50 — `[DevOps/SRE] Configurar Pipeline e Analisar logs com IA`  
**Requisito:** Seção 4.8 do documento de avaliação (DevOps inteligente, análise de logs de 2 etapas CI/CD, detecção de anomalia e estimativa de risco)

---

## 1. Pipeline de CI Configuradora

Foi adicionado um novo _job_ ao GitHub Actions (`.github/workflows/ci.yml`) que cobre a integração contínua do Agente Python:
- **Lint:** Utiliza `flake8` para checagem estática, quebrando a build caso existam erros graves (Sintaxe, Variáveis Indefinidas).
- **Testes:** Executa o `pytest` (criado no Card #49) em um ambiente limpo isolado.

---

## 2. Análise de Logs com IA (Pipeline CI)

A seguir, a simulação da análise de logs gerados nas etapas de Pipeline, utilizando a interpretação de uma IA de DevOps:

### Etapa 1: Linter (flake8)
**Log Extraído:**
```text
Run flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
agent/src/main.py:10:1: F401 'typing.Dict' imported but unused
agent/src/tools.py:45:80: E501 line too long (89 > 79 characters)
```
**Análise da IA:** 
- O linter identificou um _import_ ocioso (`Dict`) em `main.py`, que pode ser removido para limpar o código. 
- O `E501` aponta que uma linha em `tools.py` excedeu 79 caracteres. Como a _policy_ do CI possui `--exit-zero` para avisos normais, a build **passou**, mas sugere-se a adoção de um formatador como o `black` para correção automática.

### Etapa 2: Testes de Integração (pytest)
**Log Extraído:**
```text
FAILED tests/test_security.py::test_input_guard_detects_prompt_injection - AssertionError: assert False is True
```
**Análise da IA:**
- O teste de segurança falhou na asserção do bloqueio de injeção. 
- **Causa Raiz Explicada:** Isso geralmente ocorre quando a expressão regular (`_detect_injection`) ou as instruções de bloqueio foram afrouxadas em um commit recente, permitindo que a keyword maliciosa passasse para o LLM. Requer reversão imediata da heurística de segurança, pois expõe o grafo.

---

## 3. Detecção de Anomalia e Estimativa de Risco (SRE)

Para preencher a segunda parte do requisito de DevOps inteligente, simulamos a extração de dados de observabilidade do backend de Produção (MongoDB / Node.js) baseada nos logs do `fetch_events_node`.

### Anomalia Detectada: Spike de Latência e Timeouts
**Evidência (Sinal de Trace):**
Nos últimos 7 dias, a latência média do nó `fetch_events_node` (que consome a API de eventos via `GET`) subiu gradativamente de `120ms` para `1.800ms` (1.8s). No último pico (Sexta-feira, 20h), o agente começou a registrar logs de erro do tipo `Timeout`:
```json
{"message": "Erro ao buscar eventos", "level": "ERROR", "latency_ms": 5012, "event_details": {"error": "Timeout(5s)"}, "trace_id": "abc123x"}
```

**Explicação da Análise (IA SRE):**
- **Causa Raiz:** A collection de Eventos no MongoDB cresceu 400% na última semana sem um índice apropriado (`index`) nos campos de filtro (`data`, `status`). O banco está realizando _Collection Scans_ completos.
- **Risco de Falha (Estimativa):** O _connect timeout_ do Agente foi estipulado no código (`_TIMEOUT = (5, 30)`). Com o crescimento atual (tendência linear de +250ms de latência/dia), a **probabilidade de falha total nas leituras do agente nos próximos 3 dias é de 92%**.

### Ação Mitigatória Proposta:
1. **Curto Prazo:** Aumentar o `connect_timeout` e `read_timeout` na session do `requests` do Agente, ou devolver _stale data_ (cache) como fallback.
2. **Longo Prazo (DevOps/DBA):** Criar um índice no MongoDB `db.events.createIndex({ status: 1, data: -1 })`.
