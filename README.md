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

## 📌 Arquitetura do Sistema

O projeto adota uma arquitetura dividida em duas camadas principais (Frontend SPA e Backend API RESTful), utilizando comunicação assíncrona via protocolo HTTP e persistência em banco de dados NoSQL.

```mermaid
graph TD
    %% Definição de Perfis de Usuário
    subgraph Users [Acesso e Perfis]
        Admin[👤 Administrador <br> Full Access]
        Reader[👤 Leitor <br> Read-Only]
    end

    %% Camada de Frontend
    subgraph Frontend [Camada de Cliente - Frontend SPA]
        UI[Componentes UI <br> Material UI / CSS]
        RoutesFE[Rotas da Aplicação <br> React Router]
        State[Gerenciamento de Estado <br> Redux Toolkit]
        Valid[Validação de Formulários <br> Zod + React Hook Form]
        Axios[Cliente HTTP <br> Axios]

        UI --> RoutesFE
        UI --> Valid
        Valid --> State
        State --> Axios
    end

    %% Camada de Backend
    subgraph Backend [Camada de Servidor - Backend API]
        RoutesBE[Rotas & Endpoints <br> Express Routes]
        Middlewares[Middlewares <br> Auth JWT / Error Handler]
        Controllers[Controladores <br> Express Controllers]
        Services[Camada de Serviços <br> Regras de Negócio]
        Models[Modelos de Dados <br> Mongoose Models]

        RoutesBE --> Middlewares
        Middlewares --> Controllers
        Controllers --> Services
        Services --> Models
    end

    %% Camada de Persistência
    subgraph Database [Camada de Dados]
        MongoDB[(MongoDB <br> Collections: users / events)]
    end

    %% Relacionamentos e Fluxo de Dados
    Admin --> UI
    Reader --> UI
    
    Axios -- "Requisições REST (JSON + JWT)" --> RoutesBE
    Models -- "Mongoose ODM" --> MongoDB

    %% Estilização do Diagrama
    style Frontend fill:#f9f9f9,stroke:#61dafb,stroke-width:2px
    style Backend fill:#f9f9f9,stroke:#339933,stroke-width:2px
    style Database fill:#f5f5f5,stroke:#47a248,stroke-width:2px
    style Users fill:#f5f5f5,stroke:#333,stroke-dasharray: 5 5
