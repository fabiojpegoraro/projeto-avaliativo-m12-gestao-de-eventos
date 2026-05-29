# Prompt Log — Tratar erro 404 no frontend ao buscar eventos

## Data
2026-05-28

## Prompt Enviado pelo Usuário

> inicie backend e frontend. Ao acessar o frontend sem que tenha registros de eventos cadastrados, o retorno da API no endpoint é um 404.
>
> Isso está exibindo a mensagem Request failed with status code 404 no frontend. Mesmo com todos os componentes esperados renderizados.
>
> Trate o erro no frontend para que não apareça essa mensagem ao usuário.

## Objetivo da Tarefa

Tratar o status HTTP 404 retornado pela API no `fetchAllEvents` do frontend. Quando a coleção está vazia e a API retorna 404, o service deve interceptar esse status e devolver um array vazio `[]` ao invés de propagar o erro para o Redux slice e, consequentemente, para a UI.
