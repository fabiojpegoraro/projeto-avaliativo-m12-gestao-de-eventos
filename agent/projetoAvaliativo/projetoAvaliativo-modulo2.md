# IA PARA DESENVOLVEDORES [T2] - Módulo 2 - Semana 05/06
**Situação de Aprendizagem (Mini-Projeto Avaliativo)**
> Atualizado em 3 de jul. de 2026 | Criado por: Wanderson Souza

---

## 1. CONTEXTUALIZAÇÃO

Este documento descreve o Mini-Projeto Avaliativo do Módulo 2 da disciplina IA para DEVS. Nesta etapa, o foco é aplicar os conceitos de agentes de IA em um projeto prático, por meio da construção de uma solução funcional e bem documentada que automatize um processo real com apoio de IA. O projeto poderá ser desenvolvido individualmente ou em grupos de até 3 alunos.

A proposta é criar um agente usando LangGraph, demonstrando o uso de componentes como objetivo, estado, memória, ferramentas, chamadas a APIs ou arquivos, validações e geração de respostas estruturadas. O agente poderá automatizar processos relacionados ao ciclo de desenvolvimento de software (revisão de pull requests, análise de logs, etc.) ou processos específicos da temática escolhida pelo grupo. Em ambos os casos, a solução deve demonstrar um fluxo claro de automação, com entrada definida, processamento por agente, uso controlado de ferramentas e saída útil para o usuário final.

---

## 2. DESAFIO

O aluno ou grupo deverá desenvolver um agente funcional, demonstrável e documentado, capaz de automatizar um processo real. A solução deve apresentar uma entrada definida, um fluxo de execução organizado, uso de ferramenta, tratamento de contexto e uma saída útil para o usuário final.

Ao construir o agente proposto, o aluno estará colocando em prática os aprendizados em:
* Definir um agente com objetivo claro, explicando qual processo será automatizado, qual entrada será recebida e qual resultado será entregue ao usuário.
* Implementar um fluxo funcional com LangGraph, utilizando estado, nós e conexões para organizar as etapas de execução do agente.
* Aplicar conceitos de arquitetura de agentes, como separação entre planejamento, execução, uso de ferramentas e geração da resposta final.
* Integrar pelo menos uma ferramenta ao agente, como leitura/escrita de arquivos, chamada a uma API, consulta a dados, etc.
* Utilizar memória ou contexto durante a execução, mantendo informações relevantes no estado do agente.
* Aplicar cuidados básicos de segurança e validação (controle das entradas, proteção de chaves de API, limitação de ações).
* Documentar o funcionamento do agente, os principais prompts utilizados, exemplos de entrada e saída e manter o projeto versionado no GitHub.

---

## 3. RESULTADOS ESPERADOS (ENTREGA)

O projeto deverá ser entregue até **20/07/2026 às 22h**, via AVA, por meio do envio do link do repositório GitHub. O mini-projeto corresponde a 30% da nota do módulo. 

O repositório deverá estar acessível e conter:
* `README.md` completo;
* Código-fonte do agente implementado com LangGraph;
* Pelo menos uma ferramenta integrada ao agente;
* Exemplos de entrada e saída da execução;
* Registro dos principais prompts utilizados em `arquivo.md`;
* Apresentação da ideia do projeto em até 2 slides.

A apresentação deverá ser submetida via AVA ou versionada no próprio repositório. Os slides devem apresentar o problema, o processo automatizado, a proposta do agente, as ferramentas utilizadas e o fluxo geral da solução.

**Importante:**
* Não serão aceitos projetos submetidos após a data limite.
* Teste o link do repositório antes da submissão para garantir que ele está acessível.
* Não modifique o repositório após a entrega até receber a nota.
* Não versione chaves de API, tokens ou informações sensíveis no repositório.
* Todos os alunos serão avaliados pelos mesmos critérios.
* Em projetos em grupo, a entrega é coletiva, mas a avaliação será individual conforme a contribuição. Todos deverão manter evidências rastreáveis de participação (commits, documentação, revisão, etc.).

---

## 4. REQUISITOS DA APLICAÇÃO

O projeto deverá atender aos seguintes requisitos técnicos e de execução:
1.  **Definir um processo real** a ser automatizado, descrevendo o objetivo, a entrada, as etapas e a saída.
2.  **Implementar o agente com LangGraph**, utilizando fluxo organizado com estado, nós e conexões.
3.  **Integrar pelo menos uma ferramenta** ao agente (ex: chamada a API).
4.  **Utilizar memória ou contexto** durante a execução, mantendo informações relevantes no estado.
5.  **Registrar os principais prompts** utilizados em `arquivo.md`.
6.  **Documentar no README.md** como o agente funciona, como executar e decisões principais.
7.  **Manter o projeto versionado no GitHub** com contribuições rastreáveis individuais.

---

## 5. ROTEIRO DA APLICAÇÃO

### 5.1. FORMAÇÃO DOS GRUPOS E IDEIA INICIAL
Nesta etapa, o aluno ou grupo deverá:
* Definir se o projeto será individual ou em grupo.
* Escolher a temática ou case.
* Definir qual processo será automatizado.
* Criar o repositório no GitHub.
* Preparar uma apresentação (até 2 slides) contendo: problema, processo automatizado, proposta, entradas, saídas e fluxo geral.

### 5.2. DEFINIÇÃO DO AGENTE
* Definir objetivo, entradas recebidas e saídas produzidas.
* Descrever as etapas principais executadas pelo agente.
* Explicar por que a solução pode ser considerada um agente.

### 5.3. IMPLEMENTAÇÃO COM LANGGRAPH, FERRAMENTA E CONTEXTO
O fluxo deve organizar etapas claras. Uma estrutura sugerida é:
`Entrada do usuário` ➔ `Preparação do contexto` ➔ `Análise do agente` ➔ `Uso de ferramenta` ➔ `Geração da resposta final`.

O projeto deve conter: estado compartilhado, nós, conexões, uso de contexto/memória, integração de ferramenta (ex: chamada a API, consulta a dados) e resposta estruturada.

### 5.4. DOCUMENTAÇÃO, PROMPTS E REPOSITÓRIO
O `README.md` deve conter: nome do projeto, descrição do problema, objetivo, explicação do fluxo, ferramenta utilizada, instruções de execução, exemplos de entrada/saída, decisões e limitações.
Os prompts relevantes devem ficar em um arquivo como `docs/prompts.md`. O repositório deve ter commits semânticos rastreáveis.

---

## 6. CRITÉRIOS DE AVALIAÇÃO

A nota varia de **0 a 10 pontos** (30% do módulo). Projetos com plágio receberão nota 0.

| N° | Critério de Avaliação | Pontuação |
|:---|:---|:---|
| 1 | Versionamento com branches e commits semânticos | 1,0 |
| 2 | Contribuição individual e produtividade | 1,0 |
| 3 | Organização dos arquivos, documentação e prompts | 2,0 |
| 4 | Ideia do projeto e apresentação | 1,0 |
| 5 | Implementação do agente com LangGraph | 1,0 |
| 6 | Uso de ferramenta integrada ao agente | 1,0 |
| 7 | Cuidados básicos de segurança | 1,0 |
| 8 | Contexto, memória e validação básica | 2,0 |
| **-** | **Total** | **10,0** |

---

## 7. CHECKLIST FINAL DE ENTREGA

### Repositório e organização
* [ ] Criei o repositório no GitHub e ele está acessível