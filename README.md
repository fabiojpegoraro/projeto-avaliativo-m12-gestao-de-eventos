# Sistema de Gestão de Eventos

## Descrição do Projeto
O **Sistema de Gestão de Eventos** é uma aplicação web completa desenvolvida para gerenciar e visualizar eventos acadêmicos. O sistema possui acesso aberto (sem controle de usuários ou login), permitindo cadastrar, editar, excluir e visualizar os eventos livremente. A plataforma conta com uma interface intuitiva, listando os eventos separados por "Futuros" e "Passados", e oferece recursos de busca textual e ordenação, facilitando a usabilidade.

## Apresentação no Youtube
https://youtu.be/Ry7Zq1XsK3I

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
- **MongoDB**: Banco de dados NoSQL, responsável pela persistência das informações de eventos.

### Ferramentas de IA
- **Google Antigravity**: Ferramenta de IA para auxiliar na escrita de código.
- **Gemini 3.0**: Ferramenta de IA para auxiliar na escrita de código e documentação.

## Estrutura do Projeto
O projeto é um monorepo contendo duas partes principais na raiz:
- `/frontend`: Aplicação Web SPA para a interface do usuário.
- `/backend`: API REST para fornecer os dados e regras de negócio.
- `/agent`: Agente de Inteligência Artificial usando LangGraph/LangChain que consulta a API de eventos em linguagem natural.

## 🚀 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **[Node.js](https://nodejs.org)** v18 ou superior
- **MongoDB** rodando localmente na porta `27017`

> **Dica (MongoDB via Docker):**  
> A maneira mais fácil de rodar o banco localmente é ter o Docker instalado e executar:
> ```bash
> docker run -d -p 27017:27017 --name mongo-gestao mongo
> ```
> *(Alternativamente, você pode usar uma URI remota como o [MongoDB Atlas](https://www.mongodb.com/atlas))*

---

### 1. Backend

```bash
# 1. Acesse a pasta do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Copie e configure o arquivo de variáveis de ambiente
cp .env.example .env
# Abra o .env e ajuste os valores:
#   PORT=3001
#   MONGODB_URI=mongodb://localhost:27017/gestao-eventos

# 4. Inicie o servidor em modo desenvolvimento
npm run dev
```

✅ O servidor estará disponível em **`http://localhost:3001`**  
Os endpoints da API ficam em `http://localhost:3001/api/events`

---

### 2. Frontend

> **Atenção:** o backend deve estar rodando antes de iniciar o frontend.

```bash
# Em um novo terminal, acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

✅ A aplicação estará disponível em **`http://localhost:5173`**

---

### 3. Agente de IA (LangGraph)

O agente pode ser executado via terminal e consulta a API para trazer os dados dos eventos através de comandos em linguagem natural.

> **Atenção:** o backend deve estar rodando para que o agente consiga buscar os eventos. O agente requer uma chave válida da API do Google Gemini.

```bash
# 1. Acesse a pasta do agente
cd agent

# 2. Ative o ambiente virtual (se aplicável)
source venv/bin/activate

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Variáveis de ambiente
cp .env.example .env
# IMPORTANTE: Coloque sua chave GOOGLE_API_KEY no arquivo .env

# 5. Execute o agente interativo
python src/main.py
```

---

### Scripts disponíveis

| Pasta | Comando | Descrição |
|-------|---------|-----------|
| `backend` | `npm run dev` | Servidor com hot-reload (ts-node-dev) |
| `backend` | `npm run build` | Compila TypeScript para `dist/` |
| `backend` | `npm test` | Executa os testes unitários (Jest) |
| `backend` | `npm run lint` | Verifica o código com ESLint |
| `frontend` | `npm run dev` | Dev server Vite |
| `frontend` | `npm run build` | Build de produção |
| `frontend` | `npm test` | Executa os testes unitários (Vitest) |
| `frontend` | `npm run lint` | Verifica o código com ESLint |
| `agent` | `python src/main.py` | Executa o agente de IA no terminal |

## 📌 Arquitetura do Sistema

O projeto adota uma arquitetura dividida em duas camadas principais (Frontend SPA e Backend API RESTful), utilizando comunicação assíncrona via protocolo HTTP e persistência em banco de dados NoSQL. O sistema possui acesso aberto, sem controle de autenticação.

```mermaid
graph TD
    %% Usuário da Aplicação
    User[👤 Usuário Público <br> Acesso Aberto]

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
        Middlewares[Middlewares <br> Error Handler]
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
        MongoDB[(MongoDB <br> Collection: events)]
    end

    %% Relacionamentos e Fluxo de Dados
    User --> UI
    
    Axios -- "Requisições REST (JSON)" --> RoutesBE
    Models -- "Mongoose ODM" --> MongoDB

    %% Estilização do Diagrama
    style Frontend fill:#f9f9f9,stroke:#61dafb,stroke-width:2px
    style Backend fill:#f9f9f9,stroke:#339933,stroke-width:2px
    style Database fill:#f5f5f5,stroke:#47a248,stroke-width:2px