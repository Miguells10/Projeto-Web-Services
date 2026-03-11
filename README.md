# Projeto Web Services com Spring Boot e React (JHipster)

![Visão Geral do Dashboard](src/main/resources/static/loja.html) _(Acesse o dashboard rodando o projeto)_

Este projeto é um sistema completo de backend para um e-commerce ou sistema de gestão, complementado com um dashboard de interfaces ricas (frontend). A API foi implementada seguindo rigorosamente os padrões RESTful, utilizando **Java 21** com o ecossistema do **Spring Boot 3**.

A infraestrutura e o scaffolding inicial utilizaram o **JHipster** (com React e security via JWT pré-configurados), mas toda a camada de domínio, repositórios, serviços e controladores do curso foram implementadas do zero.

---

## 🎯 Objetivo e Contexto

O objetivo principal deste projeto foi aprofundar conhecimentos práticos na criação de APIs REST corporativas, modelagem de dados complexos com e uso do Hibernate/JPA para mapeamento objeto-relacional estruturado sob um banco de dados real **PostgreSQL**.

Foi dada atenção especial ao tratamento de exceções global e à separação em camadas lógicas, mantendo o código limpo, testável e manutenível.

---

## 💻 Tecnologias e Clean Architecture

- **Java 21 e Spring Boot 3**: Para a criação da API de forma veloz e moderna.
- **Spring Data JPA & Hibernate**: Implementação do Repository Pattern e ORM robusto sem Boilerplates de SQL.
- **PostgreSQL**: Banco de dados relacional em produção.
- **JHipster Framework**: Utilizado para provisionamento rápido da arquitetura base (Segurança JWT, rotas front-end, profiles de teste/dev).
- **React & Reactstrap**: Componentes React do JHipster acrescidos de um Dashboard personalizado criado do zero em HTML/CSS/JS (Vanilla com Glassmorphism) que demonstra consumo de APIs assíncronas assíncronas via `fetch`.
- **Lombok**: Redução da verbosidade do Java (Getters, Setters, Construtores).

### Arquitetura em Camadas

A aplicação foi desenvolvida respeitando a forte coesão e baixo acoplamento:

1.  **Resource Layer (Web)**: REST Controllers responsáveis por receber as requisições, retornar os DTOs (Data Transfer Objects) corretos e definir códigos HTTP semânticos (200, 201, 204, 404, etc).
2.  **Service Layer**: Alojamento detalhado de toda a regra de negócio. Mantém a camada web e de dados agnósticas umas às outras e injeta as dependências de acesso ao banco (`@Service`, `@Transactional`).
3.  **Repository Layer**: Interfaces do Spring Data JPA (`JpaRepository`) provendo abstrações das consultas SQL diretas.
4.  **Domain (Entity) Layer**: Entidades do JPA ricas em mapeamentos (`@OneToMany`, `@ManyToOne`, `@ManyToMany`, e herança de tabelas, se necessário). Contém a lógica de mapeamento bidirecional controlada contra ciclos via `@JsonIgnore`.

---

## 🚀 Principais Desafios Superados (Highlights para Currículo)

1.  **Análise e Resolução de Infinite Recursion (JSON)**:
    Sistemas corporativos sofrem constantemente com serializações JSON em grafo cíclico no JPA. Nesse projeto, identifiquei e tratei o problema manipulando estrategicamente o fluxo com `@JsonIgnore` entre `Order -> OrderItem -> Product` e `User -> Order`. Além de gerenciar Lazy Loading da Session do Hibernate encapsulando de forma segura as leituras do Entity Manager usando `@Transactional(readOnly = true)`.

2.  **Convivência Pacífica com Legacy/Scaffolds (JHipster)**:
    Para manter dois provedores de "User" (o scaffolded do JHipster e a minha implementação Customizada), fiz injeções com Qualifier por nomes (`@Service("userEntityService")`) e namespaces de banco (`@Entity(name = "ClientUser")`), provando meu conhecimento aprofundado do ciclo de vida dos Beans do Spring Context (`ApplicationContext`) e resolução de conflitos em injeção de dependência em codebases que herdam sistemas monolíticos engessados.

3.  **Tratamento Global de Exceções**:
    Para não "sujar" os REST Controllers com centenas de blocos `try-catch`, projetei um controlador central central das respostas HTTP, o `ResourceExceptionHandler` via `@ControllerAdvice`. Retornando payloads JSON elegantes e padrão com carimbo de tempo (`Timestamp`), status (`404 Not Found`, etc), a requisição que falhou e o detalhe do erro (`StandardError`).
4.  **Desenho Robusto de Banco em Perfil de Teste (Seeding)**:
    Configuração e separação em pacotes de Teste e Configurações (`TestConfig`). Usei _dependency injection_ junto com o comando `CommandLineRunner` para popular relacionalmente todo o banco de dados (Categorias, Clientes, Produtos relacionados às suas Categorias, Pedidos com data `Instant` ISO-8601 e status Enum, e Pagamentos associados na relação forte "One-to-One" compartilhando chaves) todas as vezes em que o ambiente de dev (`DEV profile`) entra no ar.

---

## 🔧 Como Executar Localmente

1. **Pré-requisitos**:

   - Java 21+ instalado.
   - Banco de dados PostgreSQL rodando na porta `5432` com usuário/senha compatíveis ou edite o arquivo `.env`.

2. **Subindo o Back-End**:
   Abra o Terminal na raiz do projeto e execute:

   ```powershell
   # Popula o env, limpa a build e sobe o Spring no profile application-dev.yml
   .\run.ps1
   ```

3. **Acessando no Navegador**:
   A API e o frontend React (incluindo o Reactstrap original) estarão disponíveis em `http://localhost:8080/`.
   - **Para avaliar meu Dashboard Customizado de gestão consumindo a REST**: Acesse direto em **[http://localhost:8080/loja.html](http://localhost:8080/loja.html)** e explore as telas interativas simulando um Admin nativo.

---

_Aprecie este reposto, ele reflete minha evolução constante em modelagem de backend e engenharia de software com a Stack Spring._
