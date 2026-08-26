import os
import requests
from typing import Literal
from langchain_core.tools import tool

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:3001/api")

# As sessões HTTP e o timeout podem ser injetados ou configurados aqui para manter as retentativas (Card #47)
# Para simplificação e desacoplamento, injetaremos as instâncias configuradas do main.py ou recriaremos.
# Aqui vamos simular recebendo do kwargs ou importar as globais (para não quebrar a arquitetura existente).

# A melhor abordagem de Clean Code é importar do main as sessões e utilitários
# ou criar um config.py. Por simplicidade, vamos importar de main (Cuidado com import circular).
# Para evitar circularidade, moveremos as sessions e utils para tools.py ou utils.py.
# Como o Review da IA sugere extrair as tools, vamos injetar as sessões HTTP globais 
# instanciadas dinamicamente dentro da tool (ou recebidas pelo config/context).

from .utils import _write_session, _TIMEOUT, _format_request_error

@tool
def consultar_eventos() -> str:
    """
    Consulta a API para obter a lista de eventos disponíveis.
    Retorna os eventos em formato JSON como string.
    Esta tool é interceptada pelo roteador para execução paralela (Card #44).
    """
    pass


@tool
def cadastrar_evento(
    nome: str,
    descricao: str,
    data_hora: str,
    local: str,
    categoria: Literal["Conferência", "Workshop", "Webinar", "Networking", "Outro"],
) -> str:
    """
    Cadastra um novo evento na API.
    A data_hora deve ser fornecida em formato válido, como '2026-12-01T14:00:00Z'.
    Esta tool requer APROVAÇÃO HUMANA antes de ser executada (Card #45).
    Retorna uma mensagem de sucesso com o ID do evento criado ou uma mensagem de erro.
    """
    try:
        payload = {
            "name": nome,
            "description": descricao,
            "dateTime": data_hora,
            "location": local,
            "category": categoria,
        }
        # Usa _write_session: retry em falhas de conexão, sem retry em status 5xx
        response = _write_session.post(
            f"{API_BASE_URL}/events", json=payload, timeout=_TIMEOUT
        )
        response.raise_for_status()
        event = response.json()
        return f"Evento '{nome}' cadastrado com sucesso! ID: {event.get('_id', 'N/A')}"
    except requests.exceptions.RequestException as e:
        return _format_request_error(e, "cadastrar o evento")
