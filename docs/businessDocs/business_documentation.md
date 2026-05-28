# Documentação de Negócio

Este documento detalha as regras de negócio, casos de uso e jornada de uso do Sistema de Gestão de Eventos. O sistema tem acesso aberto e não possui controle de usuários, login ou perfis (como Administrador ou Leitor).

## 1. Casos de Uso

- **Visualização Inicial:** Ao acessar a aplicação, a tela principal já é apresentada diretamente, exibindo a lista de eventos com as abas "Eventos Futuros" e "Eventos Passados".
- **Busca:** Utilizar o campo de pesquisa no topo para encontrar eventos pelo seu nome.
- **Ordenação:** Utilizar o componente de lista no topo para ordenar os cards de eventos por "Data" ou "Nome", com ordem "Crescente" ou "Decrescente".
- **Cadastrar Evento:** Clicar no botão "Cadastrar Eventos" (canto superior direito) para abrir o formulário de cadastro, preencher todos os dados, e salvar o evento.
- **Editar Evento:** Clicar no botão "Editar" no card de um evento específico, alterar as informações no formulário carregado e salvar as alterações.
- **Excluir Evento:** Clicar no botão "Excluir" no card do evento, confirmar a ação no Dialog ("Cancelar" / "Confirmar") e remover o evento do sistema.

---

## 2. Jornada de Uso

1. O usuário abre a aplicação web e cai diretamente na tela principal, sendo apresentado à lista de Eventos Futuros (aba padrão).
2. O usuário pode navegar para a aba de Eventos Passados, pesquisar um evento específico no topo ou ordenar a lista.
3. Se deseja criar um evento, clica em "Cadastrar Eventos". O sistema exibe um formulário vazio.
4. O usuário preenche o formulário (nome, descrição, data/hora, local, categoria) e clica em "Salvar".
5. Ao salvar, é redirecionado de volta para a tela principal e visualiza a lista com o novo evento.
6. Para alterar um evento, clica em "Editar" no card do evento, ajusta as informações no formulário e salva.
7. Para deletar, clica em "Excluir", uma caixa de diálogo de confirmação surge e o usuário clica em "Confirmar". O evento é removido da lista em seguida.

---

## 3. Regras de Validação

Os formulários do sistema devem obedecer rigorosamente às seguintes regras de validação (via Zod + React Hook Form):

> [!IMPORTANT]
> Todos os campos do formulário de Cadastro/Edição de Evento são de preenchimento obrigatório.

### Cadastro / Edição de Eventos
- **Nome:** 
  - Obrigatório.
  - Limite máximo: 100 caracteres.
  - Tipo: Texto.
- **Descrição:** 
  - Obrigatório.
  - Limite máximo: 100 caracteres.
  - Tipo: Texto.
- **Data e Hora:** 
  - Obrigatório.
  - Deve ser uma representação válida de data e tempo.
  - Tipo: Datetime.
- **Local:** 
  - Obrigatório.
  - Limite máximo: 50 caracteres.
  - Tipo: Texto.
- **Categoria:** 
  - Obrigatório.
  - Deve ser selecionada entre as opções fechadas: `Conferência`, `Workshop`, `Webinar`, `Networking` ou `Outro`.
  - Valor padrão na criação: `Conferência`.
  - Tipo: Select (combobox).

### Ações do Formulário
- Ao clicar em **"Cancelar"**, os dados não são salvos e a navegação retorna à tela principal (lista de eventos).
- Ao clicar em **"Salvar"**, o sistema valida as entradas e, se aprovadas, persiste os dados, retornando à tela principal com a listagem recém-atualizada.
