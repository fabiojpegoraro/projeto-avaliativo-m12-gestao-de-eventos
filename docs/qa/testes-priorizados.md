# IA para QA e Testes Inteligentes

**Projeto:** Gestão de Eventos com Agente IA  
**Card:** #49 — `[QA Testes] Gerar e Refinar Testes Automatizados com IA`  
**Branch:** `feature/qa-testes`  
**Requisito:** Seção 4.7 do documento de avaliação (QA e Testes Inteligentes — gerar testes e justificar priorização com base em risco)

---

## 1. Estratégia de Testes

Foram implementados testes de **Integração de Componentes**, focados em validar a lógica de roteamento e segurança do grafo do LangGraph sem a necessidade de instanciar a API do Gemini ou o backend Node.js. O framework utilizado foi o `pytest`.

Os cenários de teste validam as transições de estado (`AgentState`) processadas pelas funções de nós e roteadores (`route_after_guard`, `should_continue`, `input_guard`).

---

## 2. Priorização Baseada em Risco e Criticidade

A escolha de quais componentes testar primeiro foi pautada na **Matriz de Risco** do agente.

### Cenário Prioritário 1: Segurança (`input_guard`)
- **Justificativa:** O nó `input_guard` é o _entry point_ do grafo. Se ele falhar, um usuário mal-intencionado poderá executar *prompt injection*, exfiltrar informações do sistema ou burlar restrições (Alto Impacto).
- **Testes implementados (`test_security.py`):**
  - `test_input_guard_detects_prompt_injection`: Valida se o nó identifica corretamente strings perigosas e bloqueia o grafo, retornando uma `AIMessage`.
  - `test_input_guard_allows_safe_input`: Garante que falsos positivos não afetem a experiência de um usuário legítimo.
  - `test_route_after_guard_logic`: Garante que a flag `injection_blocked` seja roteada corretamente para `END` (parada total) ou para o nó do agente (`agent`).

### Cenário Prioritário 2: Roteamento Crítico e HITL (`route_after_approval`, `should_continue`)
- **Justificativa:** O roteamento decide se uma ferramenta é executada automaticamente ou necessita de aprovação humana. Se a lógica do `should_continue` falhar e enviar a tool `cadastrar_evento` diretamente (bypass), o sistema escreverá no banco de dados sem validação humana (Alto Risco Operacional). Da mesma forma, se o `route_after_approval` não tratar corretamente recusas, pode aprovar ações indevidas.
- **Testes implementados (`test_routing.py`):**
  - `test_should_continue_routing`: Valida as transições de saída do agente (Parallel router, Human Approval, Direct Tools e END).
  - `test_route_after_approval`: Valida se as respostas "S", "SIM", "Y" resultam em aprovação, e se rejeições ou inputs vazios resultam em cancelamento (`cancel_tool`).

---

## 3. Geração e Refinamento com IA

O código e os cenários de teste foram gerados e iterados com auxílio de IA. 

A IA auxiliou especialmente na abstração dos estados do LangGraph. Em vez de rodar o `app.invoke()` inteiro — o que exigiria mockar o Gemini e a internet —, a IA sugeriu mockar a tipagem do `AgentState` e passá-la diretamente para as funções do grafo Python, testando os "pedaços" críticos da orquestração isoladamente.

---

## 4. Como Executar os Testes

Para rodar os testes automatizados, certifique-se de estar no diretório `agent` com o ambiente virtual ativo e o `pytest` instalado:

```bash
cd agent
source venv/bin/activate
pip install -r requirements.txt
pytest tests/ -v
```

**Saída esperada:**

```
tests/test_routing.py::test_should_continue_routing PASSED
tests/test_routing.py::test_route_after_approval PASSED
tests/test_security.py::test_input_guard_detects_prompt_injection PASSED
tests/test_security.py::test_input_guard_allows_safe_input PASSED
tests/test_security.py::test_route_after_guard_logic PASSED
```
