# Sistema de Gestão de Eventos

## Descrição do Projeto
O **Sistema de Gestão de Eventos** é uma aplicação web completa desenvolvida para gerenciar e visualizar eventos acadêmicos. O sistema atende a dois perfis distintos: Administradores, que possuem controle total para gerenciar (cadastrar, editar, excluir e visualizar) os eventos, e Leitores, que possuem acesso apenas para visualização. A plataforma conta com uma interface intuitiva, listando os eventos separados por "Futuros" e "Passados", e oferece recursos de busca textual e ordenação, facilitando a usabilidade.

## Stack Tecnológica

### Frontend
- **React**: Biblioteca principal para construção da interface de usuário em formato SPA.
- **TypeScript**: Tipagem estática para JavaScript, garantindo maior segurança e manutenibilidade do código.
- **Material UI (MUI)**: Biblioteca base para componentes de interface.
- **React Hook Form + Zod**: Ferramentas para manipulação, controle e validação rigorosa de formulários.
- **Redux Toolkit**: Gerenciamento de estado global da aplicação.
- **CSS Puro**: Utilizado para estilizações customizadas não supridas pelo MUI.
- **ESLint**: Ferramenta de linting para assegurar padrões de código.
- **Jest & React Testing Library**: Frameworks para criação de testes unitários e de integração no frontend.

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework web minimalista para construção da API RESTful.
- **TypeScript**: Tipagem estática para maior previsibilidade no backend.
- **MongoDB**: Banco de dados NoSQL, responsável pela persistência das informações de usuários e eventos.

## Estrutura do Projeto
O projeto é um monorepo contendo duas partes principais na raiz:
- `/frontend`: Aplicação Web SPA para a interface do usuário.
- `/backend`: API REST para fornecer os dados e regras de negócio.
