# Mapeamento de Processos e Subprocessos

Este projeto foi desenvolvido como parte de um case técnico.

## Tecnologias Utilizadas

- **NestJS** – Framework para aplicações Node.js.
- **Prisma** – ORM para PostgreSQL.
- **PostgreSQL** – Banco de dados relacional.

## Pré-requisitos

- Node.js (recomendado: v14 ou superior)
- PostgreSQL configurado e em execução
- Variáveis de ambiente configuradas (arquivo `.env`)

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (ajuste conforme necessário):

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/case_backend"
JWT_SECRET=seuSegredoAqui
PORT=3000
```

## Deploy

A API já está publicada em: [https://case-back.onrender.com](https://case-back.onrender.com)  

O banco de dados também está hospedado em ambiente de produção, garantindo que a API esteja sempre conectada a um banco de dados remoto.


## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/VivianeBrenner/case-back.git
   cd case-mapeamento-processos-backend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

## Migrações

Após configurar o arquivo `.env`, gere e aplique as migrações do Prisma:

```bash
npx prisma migrate dev --name init
```

Isso criará as tabelas necessárias no banco de dados conforme definido no arquivo `schema.prisma`.

## Como Rodar

Para iniciar o servidor em modo de desenvolvimento com Hot Reload, execute:

```bash
npm run start:dev
```

O servidor iniciará na porta definida (por padrão, `3000`). Você pode acessar os endpoints via `http://localhost:3000`.

## Endpoints da API

### Autenticação
- **POST /auth/register**  
  Registra um novo usuário.

- **POST /auth/login**  
  Autentica o usuário e retorna token e informações do usuário.

### Processos
- **GET /process**  
  Lista todos os processos.

- **GET /process/:id**  
  Retorna um processo específico, incluindo área e árvore de subprocessos (até os níveis configurados ou via lazy loading).

- **POST /process**  
  Cria um novo processo.

- **PUT /process/:id**  
  Atualiza um processo existente.

- **DELETE /process/:id**  
  Exclui um processo.

### Subprocessos
- **GET /subprocess**  
  Lista subprocessos.

- **GET /subprocess/:id**  
  Retorna um subprocesso específico, incluindo seus filhos.

- **GET /subprocess/children?parentSubId=XX**  
  Retorna os subprocessos filhos de um subprocesso (lazy loading).

- **POST /subprocess**  
  Cria um novo subprocesso.  
  - Para subprocessos de 1º nível, envie:  
    `{ nome: string, processId: number }`  
  - Para subprocessos filhos (sub-subprocessos), envie:  
    `{ nome: string, parentSubId: number }`

- **PUT /subprocess/:id**  
  Atualiza um subprocesso existente.

- **DELETE /subprocess/:id**  
  Exclui um subprocesso.

### Áreas
- **GET /area** – Lista todas as áreas.
- **POST /area** – Cria uma nova área.
- **PUT /area/:id** – Atualiza uma área.
- **DELETE /area/:id** – Exclui uma área.

### Usuários
- **GET /user** – Lista todos os usuários.
- **PUT /user/:id/role** – Atualiza o papel (role) do usuário.

### Arquivos
- **POST /file** – Faz upload de um arquivo.
- **GET /file/:id** – Retorna informações de um arquivo.
- **DELETE /file/:id** – Exclui um arquivo.
