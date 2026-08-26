# Observabilidade — Logs Estruturados e Traces

**Projeto:** Gestão de Eventos com Agente IA  
**Card:** #48 — `[Observabilidade] Configurar Logs Estruturados e Traces`  
**Branch:** `feature/observabilidade`  
**Arquivo de Logs:** `agent/logs/agent.log`

---

## Estratégia de Observabilidade

O agente foi instrumentado com **dois sinais correlacionados**:

1. **Logs Estruturados:** Utilizando o módulo nativo `logging` com um `JsonFormatter` customizado. Os logs são gravados no formato JSON, o que facilita a ingestão e análise por ferramentas de observabilidade (ex: ELK, Datadog, CloudWatch).
2. **Traces (Correlação e Latência):**
   - **`trace_id`**: Gerado a cada novo turno/mensagem do usuário. Acompanha toda a execução dentro do LangGraph.
   - **`session_id`**: O ID da thread do usuário (preserva o contexto histórico).
   - **`latency_ms`**: Injetado no encerramento de operações custosas ou nós principais para medir o tempo de execução.

### Exemplo de Log Estruturado

```json
{
  "timestamp": "2026-08-26T00:16:24.862889+00:00",
  "level": "INFO",
  "message": "Input validado e seguro",
  "module": "main",
  "funcName": "_log_trace",
  "trace_id": "6eddff43-b0ad-4626-99cb-05aa483d2de6",
  "session_id": "test-session-obs",
  "latency_ms": 1
}
```

---

## Investigação de Execução (Trace Analysis)

### Cenário 1: Fluxo Principal — Consulta de Eventos

Abaixo está a reconstrução do fluxo de execução com base no `trace_id: a1b2c3d4...` extraído dos logs:

1. **Início do Turno:** O usuário envia uma mensagem e o `trace_id` é gerado.
   - `{"message": "Iniciando turno do usuário", "trace_id": "a1b2...", "event_details": {"input_length": 32}}`
2. **Camada de Segurança (input_guard):**
   - `{"message": "Verificando input (input_guard)", "trace_id": "a1b2..."}`
   - `{"message": "Input validado e seguro", "latency_ms": 1, "trace_id": "a1b2..."}`
3. **Tomada de Decisão (LLM):**
   - `{"message": "Iniciando chamada ao LLM (run_llm)", "trace_id": "a1b2..."}`
   - `{"message": "LLM respondeu", "latency_ms": 1250, "trace_id": "a1b2..."}`
4. **Execução Paralela (fetch_events_node):** O LLM decide chamar a tool de consulta.
   - `{"message": "Iniciando busca de eventos (fetch_events_node)", "trace_id": "a1b2..."}`
   - `{"message": "Busca de eventos concluída com sucesso", "latency_ms": 120, "event_details": {"count": 3}, "trace_id": "a1b2..."}`
5. **Síntese (LLM):** O LLM processa o JSON da API.
   - `{"message": "Iniciando chamada ao LLM (run_llm)", "trace_id": "a1b2..."}`
   - `{"message": "LLM respondeu", "latency_ms": 950, "trace_id": "a1b2..."}`
6. **Fim:**
   - `{"message": "Turno do usuário finalizado", "trace_id": "a1b2..."}`

**Insights da Investigação:**
- A verificação de segurança durou `1ms`.
- O tempo total de geração do modelo no primeiro turno foi `1.25s`.
- A API REST respondeu em `120ms` (sem timeouts/retries necessários).
- A decisão tomada foi perfeitamente mapeada pelas ferramentas e o LLM retornou um texto com os eventos formatados.

### Cenário 2: Tratamento de Falha (Timeout / Backend Offline)

Caso a API falhe, o log registrará a falha e o retry antes de expor a mensagem ao usuário:

1. `{"message": "Iniciando busca de eventos (fetch_events_node)", "trace_id": "x9y8..."}`
2. *(Requests executa 3 retentativas internamente)*
3. `{"message": "Erro ao buscar eventos", "level": "ERROR", "latency_ms": 1500, "event_details": {"error": "Max retries exceeded with url..."}, "trace_id": "x9y8..."}`

**Conclusão da Análise:** O agente recuperou-se graciosamente da exceção formatando um erro inteligível, enquanto a equipe SRE poderia consultar o `trace_id: x9y8...` no ELK ou Datadog para diagnosticar a falha na comunicação.

---

## Como visualizar logs em tempo real (Terminal)

Como o formato JSON é verboso e otimizado para ingestão em backends de log (e não leitura humana direta), para visualizar eventos ao vivo pelo terminal pode-se utilizar a ferramenta `jq`:

```bash
# Formata o JSON de forma legível e filtra apenas a mensagem, nível e latência
tail -f agent/logs/agent.log | jq '{level, message, latency_ms, trace_id}'
```
