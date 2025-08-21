# Gerenciador de Tarefas (Todo App)

Este é um projeto full-stack para um gerenciador de tarefas completo, construído com um backend em NestJS e um frontend em Next.js. O aplicativo permite que usuários se registrem, façam login, criem e gerenciem suas tarefas.

## Funcionalidades

* **Autenticação e Autorização:** Registro e login de usuários com autenticação JWT. O sistema suporta dois tipos de usuários: `USER` e `ADMIN`.
* **Gerenciamento de Tarefas:** Usuários podem criar, visualizar, editar, deletar e marcar tarefas como concluídas.
* **Prioridade e Descrição:** Cada tarefa pode ter um título, uma descrição opcional e um nível de prioridade (Alta, Média, Baixa ou Nenhuma).
* **Listagem Dinâmica:** A lista de tarefas é exibida na página inicial e pode ser ordenada por prioridade ou em ordem alfabética.
* **Painel de Administração:** Um painel de administração permite que usuários com a função `ADMIN` visualizem e gerenciem todos os usuários do sistema.
* **Persistência de Dados:** O projeto utiliza Prisma e PostgreSQL para o armazenamento seguro dos dados.

## Tecnologias Utilizadas

### Frontend (Next.js)

* **Framework:** Next.js (App Router)
* **Estilização:** TailwindCSS
* **Gerenciamento de Estado:** Context API do React para o estado de autenticação e de tarefas
* **Animações:** `framer-motion`
* **Outros:** `axios` para requisições HTTP, `react-icons`, `react-markdown` e `react-hot-toast` para notificações.

### Backend (NestJS)

* **Framework:** NestJS
* **ORM:** Prisma ORM
* **Banco de Dados:** PostgreSQL
* **Autenticação:** JSON Web Tokens (JWT) com `passport-jwt`
* **Segurança:** `bcryptjs` para criptografia de senhas
* **API:** REST API para manipulação de usuários e tarefas

## Como Configurar e Executar o Projeto

Este projeto é uma monorepo, com o backend e o frontend em pastas separadas. Siga as instruções abaixo para configurar e executar cada parte do projeto.

### 1. Backend

1.  Acesse a pasta do backend:
    ```bash
    cd backend
    ```
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Configure o banco de dados PostgreSQL e adicione as variáveis de ambiente necessárias em um arquivo `.env` na pasta `backend`. Exemplo:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"
    JWT_SECRET="secretaço"
    ```
4.  Execute as migrações do Prisma para criar as tabelas no banco de dados:
    ```bash
    npx prisma migrate dev --name <nome_da_migração>
    ```
5.  Inicie o servidor em modo de desenvolvimento:
    ```bash
    npm run start:dev
    ```
    O servidor será executado em `http://localhost:3001`.

#### Scripts do Backend

* `npm run build`: Compila o projeto.
* `npm run start`: Inicia o servidor em desenvolvimento.
* `npm run start:dev`: Inicia o servidor com `watch mode`.
* `npm run test`: Executa os testes unitários.
* `npm run test:e2e`: Executa os testes de ponta a ponta.

### 2. Frontend

1.  Acesse a pasta do frontend:
    ```bash
    cd frontend
    ```
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Crie um arquivo `.env.local` na pasta `frontend` para definir a URL da API do backend. Exemplo:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    O frontend será executado em `http://localhost:3000`.

#### Scripts do Frontend

* `npm run dev`: Inicia o servidor de desenvolvimento com `turbopack`.
* `npm run build`: Cria a build de produção.
* `npm run start`: Inicia a build de produção.
* `npm run lint`: Executa o linter do Next.js.
