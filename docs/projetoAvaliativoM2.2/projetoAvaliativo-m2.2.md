# IA PARA DESENVOLVEDORES [T2] - Situação de Aprendizagem (Projeto Avaliativo)

**Módulo 2 - Semana 12**

---

## 1. CONTEXTUALIZAÇÃO

Sistemas de inteligência artificial deixaram de atuar apenas como assistentes conversacionais e passaram a executar tarefas, consultar dados, utilizar ferramentas, manter memória e coordenar fluxos de múltiplas etapas. Essa evolução amplia o valor da IA no desenvolvimento de software, mas também introduz novos riscos: uma ferramenta pode receber parâmetros inválidos, um loop pode não terminar, uma memória pode recuperar contexto inadequado, uma ação pode ultrapassar o nível de autonomia permitido e uma execução aparentemente correta pode esconder falhas, tentativas repetidas ou decisões sem rastreabilidade.

Ao longo do Módulo 2, foram estudados os fundamentos de agentes, a diferença entre assistentes, agentes e workflows, o uso de tools e MCP, a construção de fluxos com LangGraph, memória curta e longa, RAG, integrações com APIs, segurança, governança, automação de CI/CD e ChatOps, arquitetura escalável, observabilidade, revisão de código, testes inteligentes, detecção de falhas e automações low-code. 

Neste projeto avaliativo, você deverá desenvolver uma aplicação funcional em qualquer domínio de negócio, desde que o uso de IA esteja presente na solução e seja demonstrado nas atividades previstas neste projeto. Você poderá dar continuidade à aplicação desenvolvida no mini-projeto do módulo, evoluindo-a de forma coerente e sem a necessidade de criar um sistema excessivamente grande. O objetivo não é acumular funcionalidades, mas construir uma solução funcional, demonstrável e tecnicamente explicável. O projeto deverá evidenciar como a entrada percorre o fluxo, como o agente toma decisões, quais tools são utilizadas, como o contexto é mantido ou recuperado, quais controles impedem comportamentos inseguros, como a qualidade é verificada e quais sinais permitem investigar o funcionamento da solução.

---

## 2. DESAFIO

Você deverá desenvolver ou evoluir uma aplicação funcional com agentes de IA, em qualquer domínio de negócio, integrando os conteúdos essenciais do Módulo 2. A solução deverá receber uma solicitação, evento ou conjunto de dados, executar um fluxo com múltiplas etapas, utilizar ferramentas ou serviços, produzir uma saída estruturada e registrar evidências suficientes para que outra pessoa consiga compreender, testar e reproduzir seu comportamento.

A solução poderá ser derivada do mini-projeto já desenvolvido. Nesse caso, você deverá demonstrar claramente quais capacidades foram mantidas, quais foram refatoradas e quais evoluções foram adicionadas para atender aos requisitos deste projeto final.

**Diante disso, você deverá:**
* Definir um problema real ou plausível, seus usuários, entradas, saídas, riscos e critérios de sucesso.
* Explicar se a solução é um agente, um workflow determinístico ou um sistema híbrido, justificando essa classificação.
* Modelar o fluxo principal com LangGraph, utilizando estado compartilhado, nodes, edges e controle explícito de execução.
* Implementar pelo menos uma tool funcional integrada por MCP, API, serviço, backend ou webhook, com validação de entradas e tratamento de erros.
* Implementar estratégia de memória e recuperação contextual adequada ao domínio. 
* Aplicar segurança, governança, limites de autonomia, controle de looping e aprovação humana quando necessária.
* Produzir e correlacionar pelo menos dois sinais de observabilidade que permitam investigar e reconstruir uma execução.
* Aplicar IA em revisão de código, geração ou refinamento de testes e priorização orientada a risco.
* Integrar práticas de DevOps inteligente, incluindo explicação de logs, detecção de anomalias e estimativa de tendência ou risco de falha.
* Adicionar ao menos uma integração low-code ou no-code para QA, SRE, automação ou construção visual de agentes.
* Documentar prompts, decisões, limitações, testes e evidências de execução.

---

## 3. RESULTADOS ESPERADOS (ENTREGA)

A atividade será realizada individualmente. Cada estudante será responsável pelo planejamento, desenvolvimento, documentação, testes, organização do GitHub e demonstração da própria solução, mantendo evidências reais da evolução do trabalho por meio de cards, commits, branches, pull requests, testes, prompts e demais artefatos produzidos.

O código deverá ser inserido e versionado em um repositório no GitHub, que poderá ser criado na conta pessoal do estudante, e o planejamento deverá ser realizado em um GitHub Project no formato Kanban. O professor deverá receber acesso aos artefatos necessários para a avaliação. Os links do repositório, do quadro e do vídeo deverão ser submetidos na atividade correspondente do AVA.

**A entrega será composta pelos seguintes artefatos principais:**
* Repositório no GitHub com código, testes, workflows, documentação e histórico de desenvolvimento.
* Quadro Kanban do GitHub atualizado durante o projeto.
* README.md completo, com instruções de instalação, configuração, execução e descrição da solução.
* Documentação e evidências técnicas necessárias para demonstrar as principais decisões, refinamentos, testes, observabilidade, análise de falhas e integração low-code/no-code.
* Vídeo de demonstração publicado no YouTube como não listado.

> **Informações Importantes:**
> * **Peso deste projeto:** Avaliação M2.2 – 60% da nota do módulo.
> * **Data de liberação:** 21/08/26 às 22h
> * **Data de entrega:** 31/08/26 até às 15h
> * **Submissão no AVA:** Projeto Avaliativo – M2.2

---

## 4. REQUISITOS DA APLICAÇÃO

O desenvolvimento da aplicação funcional pode ser feito em qualquer domínio de negócio, desde que o uso de IA esteja presente na solução e seja demonstrado nas atividades previstas neste projeto. As tecnologias poderão ser definidas de acordo com o domínio escolhido. A avaliação considerará a coerência entre o problema, a arquitetura, o nível de autonomia, os mecanismos de qualidade e as evidências apresentadas.

### 4.1. Domínio, escopo e cenários
* O problema, o público, as entradas, as saídas e os limites da solução deverão estar descritos no README.md.
* A aplicação deverá possuir lógica funcional compatível com o problema escolhido, sem depender exclusivamente de respostas fixas no código.
* Deverão ser demonstrados pelo menos dois cenários de uso, sendo um fluxo principal e um cenário de risco, falha, exceção ou comportamento anômalo.
* A saída principal deverá ser estruturada e adequada ao domínio, podendo utilizar JSON, modelo Pydantic, tabela, relatório, contrato de API ou formato equivalente.

### 4.2. Arquitetura agêntica e LangGraph
* Implementar o fluxo principal com LangGraph, utilizando estado compartilhado tipado, nodes com responsabilidades claras e edges explícitas.
* O fluxo deverá contemplar execução sequencial, ramificação condicional e ao menos uma paralelização simples.
* Definir condições de continuidade e parada, evitando loops indefinidos e execuções desnecessárias.
* Manter clara a separação entre decisões realizadas pelo modelo e regras determinísticas da aplicação.

### 4.3. Tools, MCP e integrações
* Implementar pelo menos uma tool funcional, com entradas e saídas bem definidas, integrada por MCP, API, serviço, backend ou webhook, incluindo validação de payloads, parâmetros e schemas e tratamento de falhas.
* Ações destrutivas ou irreversíveis deverão ser simuladas, bloqueadas ou condicionadas à aprovação humana, quando aplicável ao domínio.

### 4.4. Memória, contexto e RAG
* Implementar uma estratégia de memória ou recuperação contextual adequada ao domínio da aplicação, utilizando recursos como state, checkpointer, armazenamento persistente ou RAG.
* A estratégia adotada deverá permitir que a solução utilize informações relevantes da própria execução, de interações anteriores ou de uma fonte externa, conforme a necessidade do domínio.
* Quando utilizar RAG, documentar resumidamente a base, o chunking, a indexação, a recuperação e as fontes.
* Para outras fontes externas, indicar a origem das informações e como são recuperadas.

### 4.5. Segurança, governança e limites de autonomia
* Proteger credenciais e informações sensíveis, mantendo segredos fora do repositório, e validar permissões antes da execução de tools ou ações externas.
* Definir limites de autonomia coerentes com o domínio, determinando quando uma ação poderá ser executada, bloqueada ou depender de aprovação humana.
* Implementar e demonstrar pelo menos um cenário adversarial envolvendo prompt injection ou entrada não confiável, comprovando que conteúdos externos não substituem as regras da aplicação, ações não autorizadas não são executadas e informações sensíveis não são reveladas.

### 4.6. Observabilidade e resiliência
* Produzir e correlacionar pelo menos dois sinais de observabilidade, sendo um deles logs estruturados e o outro podendo ser trace, métrica ou registro de auditoria.
* Utilizar esses sinais para investigar pelo menos uma execução da aplicação, permitindo identificar seu fluxo, decisões relevantes, erros e latência, quando disponível.
* Aplicar tratamento básico de falhas nas integrações externas, como timeout, retry limitado ou fallback, quando aplicável ao domínio.

### 4.7. IA para QA e testes inteligentes
* Utilizar IA para analisar pelo menos uma alteração real do projeto, como um diff, trecho de código ou Pull Request real, identificando possíveis problemas ou oportunidades de melhoria.
* Gerar ou refinar testes automatizados com apoio de IA, cobrindo cenários relevantes da aplicação e incluindo pelo menos um dos seguintes tipos de teste: integração, aceitação ou E2E (end-to-end).
* Selecionar e justificar pelo menos um teste ou cenário considerado prioritário com base em risco, impacto ou criticidade.

### 4.8. DevOps inteligente e detecção de falhas
* Configurar um pipeline que execute lint, testes e build ou validação equivalente. O deploy da aplicação não será obrigatório.
* Utilizar IA para analisar e explicar logs de pelo menos duas etapas entre CI, Dockerfile, lint, testes, build e, quando houver, CD ou deploy.
* Detectar e explicar pelo menos uma anomalia, como erro recorrente, latência alta, falha de tool ou aumento da taxa de erro.
* Produzir uma estimativa simples de tendência, risco ou probabilidade de falha, utilizando dados reais ou simulados e documentados.
* Apresentar as evidências utilizadas e justificar a conclusão obtida na análise da falha ou do risco identificado.

### 4.9. Low-Code para QA, SRE e agentes
* Você deverá implementar uma automação low-code ou no-code integrada à solução principal.
* Não será necessário reconstruir a aplicação na ferramenta visual.
* O fluxo deverá possuir ao menos um gatilho, integrar-se à aplicação ou a um de seus serviços e produzir uma saída observável, como alerta, relatório, registro, comentário ou resposta.
* A lógica principal deverá permanecer na aplicação, enquanto a ferramenta visual deverá atuar como apoio à orquestração ou integração.
* O fluxo deverá possuir instruções resumidas de reprodução no README.md.
* *Extensão opcional:* o aluno poderá utilizar ChatOps ou outro mecanismo de notificação para comunicar resultados, alertas ou diagnósticos produzidos pela aplicação (ex: Discord, Slack, Teams, e-mail, GitHub Issue, webhook).

### 4.10. Prompts, modelos e refinamento
* Manter documentadas no projeto as principais instruções de sistema utilizadas pelo agente, incluindo regras de comportamento, objetivos da tarefa, restrições importantes e padrões de resposta esperados, além dos prompts relevantes que orientam o funcionamento da solução.
* Configurar o modelo utilizado por meio de variável de ambiente, evitando credenciais ou informações sensíveis no código.
* Documentar pelo menos um ciclo de refinamento de prompt ou comportamento do agente, apresentando o problema observado, a alteração realizada e o resultado obtido.

---

## 5. ROTEIRO DA APLICAÇÃO

A seguir estão os requisitos de organização e apresentação da entrega. A estrutura poderá ser adaptada ao domínio, mas deverá permitir que o avaliador localize rapidamente o código do agente, as integrações, os testes, as políticas, os workflows e as evidências.

### 5.1. FORMATO DO SISTEMA
Você poderá escolher o formato da aplicação, desde que a solução seja executável, demonstrável e documentada.
* **Formatos aceitáveis:** Aplicação de linha de comando; API local com FastAPI, Flask ou tecnologia equivalente; Interface simples com Gradio, Streamlit ou aplicação web; Aplicação integrada a serviços externos ou automações.
* Outros formatos poderão ser utilizados desde que sejam adequados ao domínio e permitam demonstrar os requisitos do projeto.
* Notebooks poderão ser utilizados apenas como apoio à experimentação ou como demonstração auxiliar, não como formato principal da aplicação entregue.
* A solução deverá possuir dados de exemplo e instruções suficientes para reproduzir os cenários demonstrados.
* Credenciais, chaves de API, tokens e outras informações sensíveis não deverão ser incluídas no repositório, no AVA ou nos demais artefatos entregues. Quando necessário, deverá ser disponibilizado um `.env.example` sem valores reais.

### 5.2. DOCUMENTAÇÃO NO README.MD
Crie um arquivo `README.md` no repositório para documentar a solução, apresentar as principais decisões técnicas e permitir que outra pessoa compreenda, configure, execute e avalie a aplicação. O `README.md` deve conter obrigatoriamente:
* **Descrição da solução:** nome do projeto, problema resolvido, público, objetivo e valor entregue. Quando houver continuidade do mini-projeto, indicar brevemente quais capacidades foram mantidas ou evoluídas.
* **Classificação e arquitetura:** classificar a solução (agente, workflow determinístico ou sistema híbrido) e apresentar um diagrama da arquitetura, destacando o fluxo LangGraph, seus principais nodes, rotas, paralelização e componentes envolvidos.
* **Tool e integração:** descrever a tool implementada e sua integração (MCP, API, webhook, etc.), indicando resumidamente sua finalidade.
* **Contexto e memória:** explicar a estratégia de memória ou recuperação contextual adotada (state, checkpointer, armazenamento persistente ou RAG) e como essas informações são utilizadas.
* **Segurança e autonomia:** apresentar os principais controles de segurança, proteção de credenciais, validações, limites de autonomia, bloqueios e aprovação humana quando aplicável, incluindo o comportamento esperado diante de uma entrada adversarial.
* **Instalação e execução:** fornecer instruções de configuração, instalação, execução e testes, incluindo as variáveis de ambiente necessárias via `.env.example`.
* **QA, observabilidade e DevOps:** apresentar as principais evidências de qualidade e operação (testes, análise de código com IA, sinais de observabilidade, pipeline, análise de logs, anomalias e estimativa de risco de falha).
* **Automação low-code/no-code:** descrever o fluxo integrado à aplicação, indicando gatilho, relação com a solução principal e saída produzida (incluindo ChatOps, se utilizado).
* **Cenários de uso:** documentar dois cenários (fluxo principal e risco/falha/exceção), apresentando exemplos de entrada, comportamento esperado e resultado.
* **Análise crítica e limitações:** apresentar pelo menos um refinamento relevante realizado, indicando o problema, a alteração e o resultado, além das principais limitações, possibilidades de evolução e link do vídeo de demonstração.

### 5.3. USO DO QUADRO DO GITHUB
* Crie um GitHub Project no formato Kanban utilizando as colunas: Backlog, A Fazer, Em Andamento, Bloqueado, Em Revisão e Concluído.
* Os cards deverão refletir o processo real, e não ser criados apenas ao final.
* Cada card deverá representar uma atividade real e conter uma descrição clara da tarefa, objetivo e resultado esperado.
* Quando aplicável, relacionar o card a branches, PRs, testes ou evidências.
* *Temas de referência para cards:* definição do problema/escopo, implementação do fluxo LangGraph, desenvolvimento da tool, memória/RAG, segurança/governança, observabilidade, QA inteligente, DevOps/anomalias, low-code, documentação e entrega.
* O quadro deve refletir de forma consistente o fluxo de desenvolvimento.

### 5.4. USO DO REPOSITÓRIO NO GITHUB
* Utilize um repositório no GitHub para controle de versionamento, inclusive em sua conta pessoal. O histórico deverá permitir identificar claramente a evolução do projeto.
* Adicionar o professor como colaborador.
* Utilizar as branches `main` e `develop` e criar feature branches a partir da `develop`. Relacionar branches, cards e PRs sempre que possível.
* Criar commits naturalmente, de acordo com a evolução do projeto, utilizando mensagens semânticas.
* Manter o código final integrado na `main` e não alterar o repositório após o prazo.
* Não versionar chaves, tokens, senhas, arquivos `.env` ou dados sensíveis. Incluir `.env.example`, dependências, comandos de execução, testes e workflows.
* Organizar a documentação e evidências no diretório `/docs` (ex: `/docs/prompts`, `/docs/qa`, `/docs/evidencias`).
* *Sugestão de branches:* `feature/langgraph-agente`, `feature/tool-integracao`, `feature/memoria-rag`, `feature/governanca`, `feature/observabilidade`, `feature/qa-inteligente`, `feature/devops-anomalias`, `feature/low-code` e `docs/readme-video`.

### 5.5. GRAVAÇÃO DE VÍDEO
O estudante deverá gravar um vídeo de demonstração, publicá-lo no YouTube como não listado, inserir o link no `README.md` e submetê-lo no AVA.
* **Duração:** Recomendada de até 10 minutos (limite máximo de 12 minutos).
* **Pontos prioritários do vídeo:**
    * Problema, objetivo e classificação da solução.
    * Visão resumida da arquitetura e das integrações.
    * Dois cenários de uso (fluxo principal e risco/falha/exceção).
    * Evidência de segurança, bloqueio ou aprovação humana.
    * Uma evidência de QA.
    * Pipeline, análise de logs, detecção de