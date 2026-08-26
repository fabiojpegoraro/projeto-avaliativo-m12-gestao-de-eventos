import sys
import os
from pathlib import Path
from langchain_core.messages import AIMessage

sys.path.insert(0, str(Path(__file__).parent.parent))

from src.main import should_continue, route_after_approval, AgentState, END

def test_should_continue_routing():
    """
    Testa o roteador principal do LangGraph a partir do LLM.
    - Se a tool_call for 'consultar_eventos', vai para 'parallel_fetch_router'
    - Se for 'cadastrar_evento', vai para 'human_approval'
    - Se não houver tool_calls, vai para END
    """
    # 1. Sem tool calls
    state_end: AgentState = {
        "messages": [AIMessage(content="Olá, como posso ajudar?")],
    }
    assert should_continue(state_end) == END

    # 2. Tool call: consultar_eventos (Paralelização)
    msg_consultar = AIMessage(
        content="",
        tool_calls=[{"name": "consultar_eventos", "args": {}, "id": "call_1"}]
    )
    state_parallel: AgentState = {"messages": [msg_consultar]}
    assert should_continue(state_parallel) == "parallel_fetch_router"

    # 3. Tool call: cadastrar_evento (Aprovação Humana)
    msg_cadastrar = AIMessage(
        content="",
        tool_calls=[{"name": "cadastrar_evento", "args": {"nome": "Teste"}, "id": "call_2"}]
    )
    state_human: AgentState = {"messages": [msg_cadastrar]}
    assert should_continue(state_human) == "human_approval"


def test_route_after_approval():
    """
    Testa o roteamento após o human-in-the-loop:
    - Y, S, SIM -> execute_approved_tool
    - N, NÃO -> cancel_tool
    """
    # Aprovação (variantes)
    assert route_after_approval({"human_approval_response": "s"}) == "execute_approved_tool"
    assert route_after_approval({"human_approval_response": "sim"}) == "execute_approved_tool"
    assert route_after_approval({"human_approval_response": "y"}) == "execute_approved_tool"
    assert route_after_approval({"human_approval_response": "yes"}) == "execute_approved_tool"

    # Rejeição (variantes)
    assert route_after_approval({"human_approval_response": "n"}) == "cancel_tool"
    assert route_after_approval({"human_approval_response": "nao"}) == "cancel_tool"
    assert route_after_approval({"human_approval_response": ""}) == "cancel_tool"
    assert route_after_approval({}) == "cancel_tool"
