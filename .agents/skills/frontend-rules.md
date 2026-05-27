# frontend-rules

## Contexto de Ativação
- Sempre que você estiver projetando, codificando, refatorando ou analisando soluções localizadas no diretório `/frontend` do projeto.

## Diretrizes de Desenvolvimento

1. **Nível de Senioridade e Qualidade:**
   O código escrito deve refletir as melhores práticas de um Desenvolvedor Frontend Sênior com pelo menos 5 anos de experiência. O código deve ser altamente performático, acessível, limpo, reusável e otimizado. O uso do React e TypeScript deve ser avançado, empregando hooks corretamente e inferência de tipos sem a utilização de `any`.

2. **Princípios SOLID:**
   A arquitetura e os componentes do frontend devem ser construídos seguindo os padrões do SOLID:
   - **S (Single Responsibility Principle):** Cada componente, hook ou serviço deve ter apenas uma única responsabilidade. Não crie componentes monolíticos.
   - **O (Open/Closed Principle):** Componentes devem ser abertos para extensão (através de props, children, composição) e fechados para modificação na sua estrutura base.
   - **L (Liskov Substitution Principle):** Componentes tipados e elementos de UI devem poder substituir abstrações mais altas de forma polimórfica e previsível.
   - **I (Interface Segregation Principle):** Interfaces de tipagem (Props) devem ser específicas para o que o componente realmente necessita, evitando passar dados desnecessários ou globais onde não cabem.
   - **D (Dependency Inversion Principle):** Desacople lógicas externas. Os componentes não devem depender diretamente das implementações (ex: chamadas diretas com axios dentro da UI), mas sim de abstrações ou hooks/serviços ejetados.

3. **Separação de Responsabilidades (Services, Store, UI):**
   Mantenha uma separação cristalina entre as diferentes camadas de dados da aplicação:
   - **Services (Requisições ao Backend):** Toda a lógica de comunicação com a API (fetch, axios, tratamento de endpoint) deve residir na pasta `services`.
   - **Store (Estado Global - Redux):** Todo o gerenciamento de estado global e lógicas de dispatch/thunks devem residir nas configurações do `redux` (geralmente em uma pasta `store` ou `features`).
   - **UI (Componentes):** Os componentes devem atuar apenas como a camada de visualização, despachando ações ou lendo dados das stores/services através de hooks, mas nunca implementando regras de negócio diretas nelas.

4. **Estrutura de Componentes:**
   A estrutura física para a criação de um componente deve **obrigatoriamente** seguir o padrão de pasta:
   - Todo componente deve ter sua própria pasta nomeada com o seu nome (em PascalCase, ex: `Header`, `Button`, `EventCard`).
   - Dentro dessa pasta, o arquivo do componente React deve sempre se chamar `index.tsx`.
   - *Exemplo:* `/src/components/Header/index.tsx`

5. **Adesão à Documentação do Projeto:**
   Todo o código e arquitetura de componentes e views devem, **obrigatoriamente**, respeitar as definições presentes nos arquivos de documentação do projeto, que atuam como fonte única de verdade. Sempre consulte:
   - `docs/businessDocs/business_documentation.md` (Para garantir que todas as validações de input, fluxos e rotas do usuário atendam aos requisitos do negócio).
   - `docs/technicalDocs/technical_documentation.md` (Para obedecer à estrutura de roteamento e consumo estipulado para integração API).
