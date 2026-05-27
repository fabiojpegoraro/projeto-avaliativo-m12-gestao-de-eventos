# backend-rules

## Contexto de Ativação
- Sempre que você estiver projetando, codificando, refatorando ou analisando soluções localizadas no diretório `/backend` do projeto.

## Diretrizes de Desenvolvimento

1. **Nível de Senioridade e Qualidade:** 
   O código escrito deve refletir as melhores práticas de um Desenvolvedor Backend Sênior com pelo menos 5 anos de experiência. O código deve ser pragmático, limpo, resiliente a falhas (error handling robusto), e otimizado. É imperativo o uso idiomático e seguro das tecnologias, bem como tipagem avançada e estrita (TypeScript) sem uso de `any`.

2. **Padrão Arquitetural (MVC):** 
   O padrão arquitetural seguido em todo o backend deve ser o MVC (Model-View-Controller). Considerando que é uma API REST, a estrutura deve ser focada na separação das camadas:
   - **Models:** Responsáveis pelo esquema de dados e persistência no banco (ex: schemas do Mongoose).
   - **Controllers:** Responsáveis por receber as requisições HTTP (req, res), orquestrar a chamada para os serviços e formatar a resposta.
   - *(A camada de View no contexto desta API é representada pelas respostas em formato JSON retornadas ao cliente).*
   - **Camada adicional de Serviços (Services):** As regras de negócio complexas não devem ficar nos Controllers, devendo ser isoladas em arquivos de serviços dedicados.

3. **Princípios SOLID:** 
   A base da modelagem orientada a objetos (ou funcional com abstrações) do código deve seguir os 5 princípios do SOLID:
   - **S - Single Responsibility Principle (SRP):** Cada módulo, classe, função ou controlador deve ter apenas uma responsabilidade (um único motivo para mudar).
   - **O - Open/Closed Principle (OCP):** O código deve ser aberto para extensão (por exemplo, ao adicionar novos tipos de eventos) mas fechado para modificações na sua estrutura principal.
   - **L - Liskov Substitution Principle (LSP):** Objetos de um programa devem ser substituíveis por instâncias de seus subtipos sem alterar a integridade do sistema.
   - **I - Interface Segregation Principle (ISP):** Crie e segmente interfaces tipadas (no TypeScript) pequenas e específicas para cada caso, evitando interfaces generalistas ("faz-tudo").
   - **D - Dependency Inversion Principle (DIP):** Dependa de abstrações (interfaces/tipos) e não de implementações concretas, promovendo baixo acoplamento. Injeção de dependências ou passagem de referências devem ser utilizadas quando aplicável.

4. **Adesão à Documentação do Projeto:**
   Todo o código e a arquitetura construídos devem, **obrigatoriamente**, respeitar e seguir o que foi estabelecido nos arquivos de documentação do projeto, que atuam como fonte da verdade. Antes e durante o desenvolvimento, consulte-os:
   - `docs/businessDocs/business_documentation.md` (Para garantir regras de uso, acessos e requisitos da modelagem).
   - `docs/technicalDocs/technical_documentation.md` (Para garantir que os Modelos, collections e schemas reflitam a arquitetura combinada).
