# Documentação de Negócio

Este documento detalha as regras de negócio, casos de uso e jornadas dos perfis do Sistema de Gestão de Eventos.

## 1. Casos de Uso

### 1.1 Administrador (Admin)
- **Login:** Acessar o sistema utilizando `admin@eventos.com` e a senha `admin123`.
- **Visualização de Eventos:** Ter acesso à tela principal contendo as abas "Eventos Futuros" e "Eventos Passados".
- **Busca:** Utilizar o campo de pesquisa no topo para encontrar eventos pelo seu nome.
- **Ordenação:** Utilizar o componente de lista no topo para ordenar os cards de eventos por "Data" ou "Nome", com ordem "Crescente" ou "Decrescente".
- **Cadastrar Evento:** Clicar no botão "Cadastrar Eventos" (canto superior direito) para abrir o formulário de cadastro, preencher todos os dados, e salvar o evento.
- **Editar Evento:** Clicar no botão "Editar" de um evento específico, alterar as informações no formulário carregado e salvar as alterações.
- **Excluir Evento:** Clicar no botão "Excluir" no evento, confirmar a ação no Dialog ("Cancelar" / "Confirmar") e remover o evento do sistema.
- **Logout:** Clicar no botão "Sair" posicionado no canto superior direito do Header.

### 1.2 Leitor (Reader)
- **Login:** Acessar o sistema utilizando `leitor@eventos.com` e a senha `leitor123`.
- **Visualização de Eventos:** Ter acesso à tela principal contendo as abas "Eventos Futuros" e "Eventos Passados". (Botões "Editar" e "Excluir" não estarão visíveis nem o botão "Cadastrar Eventos").
- **Busca:** Buscar eventos por nome no campo respectivo.
- **Ordenação:** Ordenar a visualização dos cards por "Data" ou "Nome" (crescente/decrescente).
- **Logout:** Clicar no botão "Sair" do Header.

---

## 2. Jornadas dos Usuários

### Jornada do Administrador
1. O Admin abre a aplicação web e encontra a tela de login.
2. Insere suas credenciais de acesso (`admin@eventos.com`).
3. Ao entrar, o Admin cai na tela principal da aplicação e é apresentado à lista de Eventos Futuros (aba padrão).
4. O Admin pode navegar para a aba de Eventos Passados, pesquisar um evento específico no topo ou ordenar a lista.
5. Se deseja criar um evento, ele clica em "Cadastrar Eventos". O sistema exibe um formulário vazio.
6. O Admin preenche o formulário (nome, descrição, data/hora, local, categoria) e clica em "Salvar".
7. Ao salvar, ele é redirecionado de volta para a tela principal e visualiza a lista com o novo evento.
8. Para alterar um evento, ele clica em "Editar" no card do evento, ajusta as informações e salva.
9. Para deletar, clica em "Excluir", uma caixa de diálogo surge e o Admin clica em "Confirmar". O evento some da lista em seguida.
10. Ao finalizar seu uso, clica em "Sair" para encerrar a sessão.

### Jornada do Leitor
1. O Leitor abre a aplicação web e insere suas credenciais na tela de login (`leitor@eventos.com`).
2. Ele é direcionado à tela principal, onde consegue ver as mesmas abas de eventos futuros e passados.
3. Diferente do Admin, a interface dele é apenas de consulta. Não há botões de edição, deleção ou criação de eventos.
4. O Leitor pode usar a busca textual ou os filtros de ordenação para encontrar informações sobre o evento de seu interesse.
5. Após concluir a visualização, clica em "Sair" no Header.

---

## 3. Regras de Validação

Os formulários do sistema devem obedecer rigorosamente às seguintes regras de validação (via Zod + React Hook Form):

> [!IMPORTANT]
> Todos os campos do formulário de Cadastro/Edição de Evento são de preenchimento obrigatório.

### Autenticação (Login)
- **Email:** Campo obrigatório, formato de e-mail válido.
- **Senha:** Campo obrigatório.

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
  - O usuário deve selecionar entre as opções fechadas: `Conferência`, `Workshop`, `Webinar`, `Networking` ou `Outro`.
  - Valor padrão na criação: `Conferência`.
  - Tipo: Select (combobox).

### Ações do Formulário
- Ao clicar em **"Cancelar"**, os dados não são salvos e o usuário retorna à tela principal (lista de eventos).
- Ao clicar em **"Salvar"**, o sistema valida as entradas e, se aprovadas, persiste os dados, retornando o usuário à tela principal com a listagem recém-atualizada.
