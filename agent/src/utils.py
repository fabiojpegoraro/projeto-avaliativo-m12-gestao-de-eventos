import os
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:3001/api")
_TIMEOUT = (5, 30)

# Session GET (idempotente)
_read_retry = Retry(
    total=3,
    backoff_factor=0.5,
    status_forcelist=[500, 502, 503, 504],
    allowed_methods=["GET"],
    raise_on_status=False,
)
_read_session = requests.Session()
_read_session.mount("http://", HTTPAdapter(max_retries=_read_retry))
_read_session.mount("https://", HTTPAdapter(max_retries=_read_retry))

# Session POST (não-idempotente)
_write_retry = Retry(
    total=3,
    backoff_factor=0.5,
    status_forcelist=[],
    allowed_methods=["POST", "PUT", "PATCH", "DELETE"],
    raise_on_status=False,
)
_write_session = requests.Session()
_write_session.mount("http://", HTTPAdapter(max_retries=_write_retry))
_write_session.mount("https://", HTTPAdapter(max_retries=_write_retry))

def _format_request_error(e: Exception, operation: str) -> str:
    """Formata mensagens de erro HTTP."""
    if isinstance(e, requests.exceptions.Timeout):
        return (
            f"⏱️  Timeout ao {operation}: o backend não respondeu dentro do prazo "
            f"({_TIMEOUT[0]}s conexão / {_TIMEOUT[1]}s leitura)."
        )
    if isinstance(e, requests.exceptions.ConnectionError):
        return (
            f"🔌 Falha de conexão ao {operation}: não foi possível alcançar o backend em {API_BASE_URL}."
        )
    if isinstance(e, requests.exceptions.HTTPError):
        status = getattr(getattr(e, 'response', None), 'status_code', 'desconhecido')
        return f"🚫 Erro HTTP {status} ao {operation}."
    return f"❌ Erro inesperado ao {operation}: {str(e)}"
