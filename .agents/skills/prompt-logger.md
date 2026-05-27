# prompt-logger

## Descrição
Monitora e documenta automaticamente as instruções de engenharia de prompt enviadas pelo usuário para fins de avaliação acadêmica.

## Contexto de Ativação
- Sempre que o usuário solicitar a criação de um novo arquivo, nova funcionalidade, refatoração de código, estilo CSS ou alteração de lógica.
- Antes de modificar ou criar qualquer arquivo no espaço de trabalho.

## Protocolo de Execução
1. **Bloqueio de Ação:** Não altere nenhum código ou arquivo do projeto antes de concluir este protocolo.
2. **Identificação:** Capture o último comando/prompt enviado pelo usuário que disparou a ação.
3. **Persistência:** 
   - Certifique-se de que a pasta `docs/prompts/` existe na raiz do projeto.
   - Crie um arquivo `.md` com um nome descritivo baseado na data atual e na tarefa (ex: `docs/prompts/2026-05-25_criar-autenticacao.md`).
4. **Registro:** Escreva dentro desse arquivo o prompt exato enviado pelo usuário, o objetivo da tarefa e a data.
5. **Prosseguir:** Só após salvar com sucesso o arquivo de documentação na pasta `docs/prompts/`, prossiga com a execução da tarefa de código original solicitada pelo usuário.
