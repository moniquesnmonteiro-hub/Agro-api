# AgroSense API

Esta é uma API RESTful desenvolvida como parte do curso de Desenvolvimento Full Stack no INDT. O sistema foi projetado para auxiliar pesquisadores no monitoramento de áreas de estudo, permitindo o controle centralizado de dados coletados por sensores distribuídos em diferentes hectares.

## Tecnologias Utilizadas

- **Runtime:** Node.js
- **Linguagem:** TypeScript
- **Framework:** Express.js
- **Banco de Dados:** PostgreSQL (TypeORM)
- **Validação:** Zod/Joi (indicado pela pasta `validats`)
- **Logs:** Winston/Morgan (indicado pela pasta `logs`)
- **Ferramentas:** Docker, Postman

## Arquitetura

O projeto segue o padrão de **Arquitetura em Camadas**, garantindo separação de responsabilidades e facilidade de manutenção:

- **Controllers:** Responsáveis por lidar com as requisições e respostas HTTP.
- **Services:** Contêm a regra de negócio central da aplicação.
- **Entities/Models:** Definição da estrutura de dados para os bancos relacionais e não-relacionais.
- **Middlewares:** Tratamento de erros centralizado e validações de corpo de requisição.