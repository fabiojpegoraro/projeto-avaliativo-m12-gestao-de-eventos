# Registro de Prompt

**Data:** 2026-07-16
**Objetivo da Tarefa:** Adicionar uma nova ferramenta (tool) ao agente LangGraph para realizar o cadastro (POST) de eventos consumindo a API, com validação de campos obrigatórios e categorias específicas.

## Prompt Exato:

```text
no agente implementado, adicione uma tool que faz o cadastro (post) de um novo evento.

As informações obrigatórios para cadastrar um evento são as seguintes:

Nome
Descrição
Data e hora
Local
Categoria

Para o campo categoria, somente as seguintes opções são aceitas:
Conferência, Workshop, Webinar, Networking, Outro.
```
