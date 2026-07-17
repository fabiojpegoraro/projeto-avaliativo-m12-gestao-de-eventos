# Registro de Prompt

**Data:** 2026-07-14
**Objetivo da Tarefa:** Verificar por que os imports do LangChain e LangGraph no arquivo main.py estão apresentando o erro "Cannot find module" no IDE e se há necessidade de ajustes.

## Prompt Exato:

```text
os seguintes imports no arquibo main.py estão apresentando problemas:

from langchain_core.messages import BaseMessage, HumanMessage, ToolMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langchain_core.tools import tool

Para todos eles, a observação é "Cannot find module".

Verifique se há a necessidade de ajuste ou se funcionará com o fallback.
```
