# FullStack TodoList

Este repositório é um **monorepo** que reúne uma aplicação fullstack completa para gerenciamento de tarefas (**To-Do List**). Ele contém dois projetos independentes, porém integrados: uma **API** desenvolvida em Java com Spring e um **frontend** moderno em Next.js.

---

## 📦 Estrutura do Monorepo

```
FullStack-TodoList/
│
├── todo-list-api/          # Backend em Java 21 + Spring
└── todo-list-frontend/     # Frontend em Next.js 16
```

---

## 🔧 Descrição dos Projetos

### 🖥️ Frontend – `todo-list-frontend`

Aplicação web construída com **Next.js 16**, responsável pela interface com o usuário. Permite visualizar, criar, editar e remover tarefas, comunicando-se diretamente com a API do monorepo.

---

### ⚙️ Backend – `todo-list-api`

API REST desenvolvida em **Java 21** utilizando **Spring Framework**. Fornece os endpoints que abastecem o frontend, permitindo:

* Listar tarefas
* Criar nova tarefa
* Editar tarefa existente
* Deletar tarefa

---

## 🎯 Objetivo do Monorepo

O propósito deste monorepo é permitir uma visão única e organizada da solução completa, facilitando o desenvolvimento, versionamento e evolução conjunta dos dois projetos. Cada aplicação mantém sua própria documentação específica para instalação, execução e build.

---

## 🔗 Autor

[LinkedIn – Tiago dos Santos Angelo](https://www.linkedin.com/in/tiago-dos-santos-angelo/)
