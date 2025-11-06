# Todo List API

API REST desenvolvida com Spring Boot e Java 21 para gerenciamento de tarefas.

## 📋 Pré-requisitos

- Java 21
- Docker e Docker Compose
- DBeaver (ou outro cliente PostgreSQL)
- Maven (caso não use o wrapper incluído no projeto)

## 🚀 Como executar o projeto

### 1. Subir o banco de dados

Navegue até o diretório do Docker e execute o comando para subir o container do PostgreSQL:

```bash
cd todo-list-api/database-docker
docker-compose up -d
```

### 2. Configurar o banco de dados

#### 2.1 Criar conexão no DBeaver

Abra o DBeaver e crie uma nova conexão PostgreSQL com as seguintes configurações:

- **Host:** `localhost`
- **Port:** `5500`
- **Database:** `postgres` (ou conforme configurado)
- **Username:** `postgres`
- **Password:** *(Verificar no arquivo `application.yaml` do projeto)*

#### 2.2 Testar a conexão

Clique em "Test Connection" para verificar se a conexão está funcionando corretamente.

#### 2.3 Executar os scripts SQL

Após a conexão bem-sucedida, execute os seguintes scripts na ordem:

**Script 1 - Criar tabela:**
```sql
CREATE TABLE todo( 
    id BIGSERIAL NOT NULL,
    type_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250) NOT NULL
);
```

**Script 2 - Adicionar chave primária:**
```sql
ALTER TABLE todo ADD CONSTRAINT todoList_pk PRIMARY KEY (id);
```

### 3. Executar a aplicação

Na raiz do projeto, execute:

```bash
./mvnw spring-boot:run
```

Ou, se estiver no Windows:

```bash
mvnw.cmd spring-boot:run
```

## 🔧 Configuração

As configurações da aplicação estão no arquivo `application.yaml`. Verifique especialmente:

- Porta da aplicação
- Configurações de conexão com o banco de dados
- Password do PostgreSQL

## 📝 Notas

- Certifique-se de que a porta `5500` não está sendo utilizada por outro serviço
- O Docker deve estar em execução antes de subir o container do banco de dados
- Mantenha o container do PostgreSQL rodando enquanto estiver utilizando a aplicação

## 🛠️ Tecnologias utilizadas

- Java 21
- Spring Boot
- PostgreSQL
- Docker
- Maven
