# Registro de Prompt

**Data:** 2026-05-26
**Objetivo da Tarefa:** Gerar a documentação de negócio, documentação técnica e README.md para o Sistema de Gestão de Eventos com base no escopo e regras informadas.

## Prompt Enviado

```text
Atue como um Engenheiro de Software Sênior e Analista de Requisitos.

Contexto do Projeto:
Estou desenvolvendo um Sistema de Gestão de Eventos para um projeto acadêmico. O sistema é dividido em duas pastas na raiz do projeto: /backend e /frontend.

Stack Tecnológica:

Frontend: React, TypeScript, Material UI (MUI) para componentes, React Hook Form + Zod para validação de formulários, Redux Toolkit para estado global, CSS puro para estilização customizada, ESLint para linting, Jest e React Testing Library para testes.

Backend: Node.js com Express, TypeScript, MongoDB.

Regras de Negócio e Acesso:

Perfis: Administrador (admin@eventos.com / senha: admin123) e Leitor (leitor@eventos.com / senha: leitor123).

Autenticação: Ambos fazem login e são redirecionados para a mesma tela principal.

Interface e Funcionalidades (Tela Principal):

Header: Nome do sistema no canto esquerdo e botão de "Sair" no canto direito.

Abas: "Eventos Futuros" e "Eventos Passados".

Cards de Eventos: Exibem Nome, Descrição, Data e Hora, Local e Categoria.

Busca e Ordenação: No topo, campo de busca por nome. Ao lado, componente de lista para ordenar por "Data" ou "Nome", com opção de "Crescente" ou "Decrescente".

Ações do Administrador (apenas para Admin):

Botão "Cadastrar Eventos" no canto superior direito da tela principal.

Botões "Editar" e "Excluir" no canto inferior direito de cada card.

A exclusão exige confirmação via Dialog (Cancelar/Confirmar). Se confirmado, o evento é excluído e a lista atualizada automaticamente.

Formulário de Cadastro/Edição:
Todos os campos são obrigatórios:

Nome: Texto (limite de 100 caracteres).

Descrição: Texto (limite de 100 caracteres).

Data e Hora: Datetime.

Local: Texto (limite de 50 caracteres).

Categoria: Select (Conferência, Workshop, Webinar, Networking, Outro). Padrão: Conferência.

Ações: Botões "Cancelar" e "Salvar" no canto inferior direito. Ambos retornam à lista de eventos (com a lista atualizada em caso de salvamento). Na criação, os campos iniciam vazios. Na edição, carregam os dados do evento.

Tarefa:
Com base neste contexto, gere a documentação completa do projeto dividida nas seguintes seções:

Documentação de Negócio: Casos de uso detalhados, jornadas dos usuários (Admin vs Leitor) e regras de validação.

Documentação Técnica: Arquitetura do sistema, estrutura de pastas proposta (focada na raiz contendo /frontend e /backend) e modelagem de dados prevista para o MongoDB.

Arquivo README.md: Gere o conteúdo exato que deve ir na raiz do projeto. Este README deve obrigatoriamente conter uma descrição breve e objetiva do sistema e a stack tecnológica detalhada para backend e frontend.
```
