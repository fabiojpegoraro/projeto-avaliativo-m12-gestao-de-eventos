# Registro de Prompt

**Data:** 2026-07-18
**Objetivo da Tarefa:** Atualizar o README.md para incluir informações detalhadas sobre o agente (geração de chave de API, consumo de endpoints locais e arquivo de apresentação do agente) e integrá-lo ao diagrama de arquitetura Mermaid no final do documento.

## Prompt Exato:

```text
Você é um desenvolvedor sênior com experiência em implementação de agentes com uso de tools e orquestração de nós com LangGraph.

No projeto atual, temos um agente implementado na pasta agent.

Adicione no README.md do projeto as seguintes informações na secção sobre o agente:

Para execuá-lo, precisa de uma chave de API, que pode ser gerada a partir do link https://aistudio.google.com/api-keys?project=gen-lang-client-0519587524;

O agente faz a consulta e criação de eventos consumindo os endpoints da API que está no mesmo projeto;

A apresentação sobre o funcionamento do agente está no próprio repositório, e é o arquivo docs/IntelligentEventAgent.pdf;

Por último, adicione o agente ao esquema da arquitetura do sistema feito em mermaid que está no final do README.md.

Não altere arquivos que não sejam de documentação.
```
