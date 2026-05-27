1. Descrição do Projeto
  O Site Pudim da Didi é uma aplicação web full-stack composta por uma API desenvolvida em .NET e um frontend dinâmico construído em Angular.

2. Tecnologias Utilizadas
   Linguagem - C# (backend) e TypeScript (frontend)
   Framework Backend - ASP.NET Core 10.0 (Web API)
   Framwork Frontend - Angular 21.2.0 com Angular Material
   Banco de Dados - MySQL (via Entity Framework Core 9.0)
   Segurança - Autenticação JWT (JSON Web Token) e Hash SHA-256 para senhas
   Documentação de API - Swagger / OpenAPI 6.5.0

3. Instruções de Execução
  Para rodar o projeto localmente, siga os passos abaixo:
  1. Pré-requisitos: Certifique-se de ter o .NET 10 SDK, Node.js e um servidor MySQL instalados.
  2. Configuração do Banco: No arquivo appsettings.json da pasta api/, ajuste a DefaultConnection com suas credenciais do MySQL.
  3. Executar a API:
     cd api/api
     dotnet run
     
     OBS:As migrations e o seed de dados (produtos iniciais e usuário vendedor) serão executados automaticamente no primeiro acesso.
  4. Executar o Frontend:
     cd web
     npm install
     npm start
  5. Acesso: O frontend estará disponível em http://localhost:4200 e a documentação Swagger da API em http://localhost:5157/swagger.
  6. Endpoints da API:
     Abaixo estão os principais endpoints disponíveis no sistema:

      Autenticação - POST - /api/auth/registrar - Cadastro de novos clientes
     
      Autenticação - POST - /api/auth/login - Autenticação de usuários
     
      Produtos - GET - /api/products - Lista todos os produtos ativos
     
      Produtos - POST - /api/products - Criação de produto (Restrito: Vendedor)
     
      Carrinho - GET - /api/cart - Obtém o carrinho do usuário logado
     
      Pedidos - POST - /api/orders - Finalização de um novo pedido
     
      Pedidos - GET - /api/orders/meus-pedidos - Histórico de pedidos do cliente
     
      Administração - PUT - /api/orders/{id}/status - Atualiza status do pedido (Restrito: Vendedor)     
