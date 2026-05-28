# Documentação Técnica

Este documento fornece as diretrizes arquiteturais, a organização dos diretórios e a modelagem do banco de dados (MongoDB) que sustentarão o desenvolvimento do Sistema de Gestão de Eventos. O sistema não possui autenticação nem controle de usuários.

## 1. Arquitetura do Sistema

O projeto adota uma arquitetura em duas camadas principais, separando responsabilidades do lado do cliente (Frontend) e do lado do servidor (Backend). Ambas as camadas se comunicam através de requisições HTTP RESTful em formato JSON.

### Frontend
- **Padrão:** Single Page Application (SPA).
- **Core:** React com TypeScript.
- **Gerenciamento de Estado:** Redux Toolkit para gerenciar estados globais (ex.: eventos em cache).
- **Roteamento:** React Router (sugerido) para navegação entre Home (Lista de Eventos) e Tela de Formulário.
- **Comunicação:** Axios ou funções nativas `fetch` encapsuladas por Redux Thunks/RTK Query para integração com a API.
- **Estilo:** Material UI para componentes base padronizados e CSS puro importado (arquivos `.css`) para ajustes e refinamentos customizados.

### Backend
- **Padrão:** API RESTful baseada na arquitetura MVC (Model-View-Controller) simplificada (Controladores e Modelos + Camada de Serviços).
- **Core:** Node.js com o framework web Express e suporte a TypeScript.
- **Persistência de Dados:** MongoDB interagindo através da biblioteca de ODM Mongoose.

---

## 2. Estrutura de Pastas Proposta

A seguir, a estrutura recomendada partindo da raiz do projeto (`/`), separando as duas instâncias do sistema.

> [!TIP]
> A manutenção da separação estrita na raiz entre `/frontend` e `/backend` ajuda na orquestração de deploys independentes se for necessário futuramente.

```text
/
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações gerais (db, env vars)
│   │   ├── controllers/     # Controladores das rotas e requisições HTTP
│   │   ├── middlewares/     # Funções intermediárias (error handler)
│   │   ├── models/          # Modelos de dados Mongoose (Event)
│   │   ├── routes/          # Definição e agrupamento dos endpoints REST
│   │   ├── services/        # Regras de negócio e comunicação direta com models
│   │   ├── utils/           # Funções e lógicas auxiliares utilitárias
│   │   ├── app.ts           # Inicialização do Express
│   │   └── server.ts        # Ponto de entrada (Boot do servidor Node)
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── assets/          # Mídias locais estáticas (ícones, logos, imagens)
    │   ├── components/      # Componentes visuais reusáveis (Header, EventCard, ConfirmDialog)
    │   ├── features/        # Regras de estado do Redux Toolkit (eventsSlice)
    │   ├── pages/           # Views principais amarradas a rotas (Home, EventForm)
    │   ├── routes/          # Configuração de rotas de navegação da aplicação
    │   ├── services/        # Configuração do Axios/API e requisições HTTP
    │   ├── styles/          # Arquivos `.css` para personalização
    │   ├── types/           # Definição global de tipagens TypeScript (Interfaces)
    │   ├── utils/           # Máscaras, formatações e esquemas de validação (Zod)
    │   ├── App.tsx          # Componente raiz
    │   └── main.tsx         # Ponto de entrada da renderização React
    ├── package.json
    └── tsconfig.json
```

---

## 3. Modelagem de Dados Prevista (MongoDB / Mongoose)

O banco de dados possuirá apenas uma coleção (Collection) principal: **Events**.

### Collection: `events`
Guarda todas as propriedades referentes aos eventos criados no sistema.

| Campo | Tipo | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Identificador único. | Gerado pelo MongoDB. |
| `name` | String | Nome descritivo do evento. | `required: true`, `maxlength: 100` |
| `description`| String | Breve descrição do evento. | `required: true`, `maxlength: 100` |
| `dateTime` | Date | Data e hora em que o evento ocorrerá. | `required: true` |
| `location` | String | Endereço ou plataforma do evento. | `required: true`, `maxlength: 50` |
| `category` | String | Categoria temática do evento. | `enum: ['Conferência', 'Workshop', 'Webinar', 'Networking', 'Outro']`, `required: true`, `default: 'Conferência'` |
| `createdAt` | Date | Timestamp de criação. | (Gerado pelos timestamps do Mongoose) |
| `updatedAt` | Date | Timestamp da última atualização. | (Gerado pelos timestamps do Mongoose) |
