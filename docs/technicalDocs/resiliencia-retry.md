# Estratégia de Resiliência — Timeout e Retry nas Tools

**Projeto:** Gestão de Eventos com Agente IA  
**Card:** #47 — `[Resiliência] Adicionar Timeout e Retry nas Tools`  
**Branch:** `feature/resilencia-tools`  
**Arquivo:** `agent/src/main.py`

---

## Motivação

Chamadas HTTP ao backend Node.js podem falhar por razões transitórias:
- Sobrecarga momentânea do servidor
- Restart do processo Node.js
- Latência de rede elevada
- Erros temporários do MongoDB

Sem tratamento, qualquer dessas falhas resultaria em uma exception não tratada chegando ao usuário. Com retry + timeout configurados, o agente tenta se recuperar automaticamente e, se falhar, entrega uma mensagem clara e diagnóstica.

---

## Implementação

### Constantes

```python
_TIMEOUT = (5, 30)  # (connect_timeout, read_timeout) em segundos
```

O timeout de conexão (5s) cobre o handshake TCP. O timeout de leitura (30s) garante que operações lentas (ex: cold start do servidor, consultas MongoDB pesadas) tenham tempo suficiente.

### Session de Leitura (GET) — Retry Completo

```python
_read_retry = Retry(
    total=3,                               # Máximo de 3 tentativas
    backoff_factor=0.5,                    # Delays: 0s → 0.5s → 1.0s
    status_forcelist=[500, 502, 503, 504], # Retry em erros de servidor
    allowed_methods=["GET"],
    raise_on_status=False,
)
_read_session = requests.Session()
_read_session.mount("http://", HTTPAdapter(max_retries=_read_retry))
_read_session.mount("https://", HTTPAdapter(max_retries=_read_retry))
```

**Por que retry em GET?** GET é idempotente — executar múltiplas vezes produz o mesmo resultado, sem efeitos colaterais.

**Status 5xx com retry:** Erros 500/502/503/504 geralmente indicam falha temporária do servidor. Retry com backoff dá tempo para o servidor se recuperar.

### Session de Escrita (POST) — Retry Limitado

```python
_write_retry = Retry(
    total=3,
    backoff_factor=0.5,
    status_forcelist=[],               # SEM retry em status codes
    allowed_methods=["POST", "PUT", "PATCH", "DELETE"],
    raise_on_status=False,
)
_write_session = requests.Session()
_write_session.mount("http://", HTTPAdapter(max_retries=_write_retry))
_write_session.mount("https://", HTTPAdapter(max_retries=_write_retry))
```

**Por que sem retry em status codes para POST?**

```
Cenário de risco sem essa proteção:
1. Usuário cadastra evento "Python Summit"
2. Backend processa, salva no MongoDB (sucesso)
3. Conexão cai ANTES de retornar 200 ao cliente
4. Cliente recebe ConnectionError → com retry, tentaria novamente
5. Resultado: evento cadastrado DUAS vezes ❌
```

Com `status_forcelist=[]`, o retry apenas ocorre em falhas de conexão (antes de chegar ao servidor), não em falhas de status HTTP (que podem indicar que o servidor já processou).

---

## Diagrama de Decisão

```
Chamada HTTP falha?
        │
        ├─ ConnectionError? ──► Retry (até 3x, backoff)
        │                         └─ Ainda falha? → _format_request_error()
        │
        ├─ Timeout? ─────────► _format_request_error() imediato (sem retry adicional*)
        │                       * Retry já está na session para timeouts de conexão
        │
        ├─ HTTPError 5xx?
        │    ├─ GET:  Retry (até 3x, backoff 0.5s)
        │    └─ POST: _format_request_error() imediato (evita duplicação)
        │
        └─ Sucesso ──────────► Processa resposta normalmente
```

## Mensagens de Erro Granulares

A função `_format_request_error(e, operation)` distingue três tipos de falha:

| Tipo de Exceção | Mensagem ao Agente | Diagnóstico para Usuário |
|---|---|---|
| `Timeout` | ⏱️ Timeout ao {operação}... | Servidor lento ou travado |
| `ConnectionError` | 🔌 Falha de conexão ao {operação}... | Backend não está rodando |
| `HTTPError` | 🚫 Erro HTTP {status} ao {operação}... | Erro específico do servidor |
| `RequestException` | ❌ Erro inesperado... | Fallback genérico |

---

## Como Testar

### Teste 1 — Backend offline (ConnectionError)
```bash
# Pare o backend Node.js e tente consultar eventos no agente
# Esperado:
# 🔌 Falha de conexão ao consultar eventos: não foi possível alcançar o backend em http://localhost:3001/api
```

### Teste 2 — Retry em ação (simulado com netcat)
```bash
# Simule um servidor que não responde imediatamente
# O agente tentará 3 vezes com backoff antes de desistir
```

### Teste 3 — Timeout
```bash
# Configure _TIMEOUT = (0.001, 0.001) temporariamente
# Esperado:
# ⏱️  Timeout ao consultar eventos: o backend não respondeu dentro do prazo...
```

---

## Referências

- [urllib3 Retry documentation](https://urllib3.readthedocs.io/en/stable/reference/urllib3.util.retry.html)
- [requests HTTPAdapter](https://requests.readthedocs.io/en/latest/api/#requests.adapters.HTTPAdapter)
- [Idempotência em REST APIs](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent)
