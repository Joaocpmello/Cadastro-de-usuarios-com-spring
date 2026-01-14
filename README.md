# Sistema de Cadastro e Login com JWT

Projeto desenvolvido com o objetivo de praticar e consolidar conhecimentos em *Java + Spring Boot*, incluindo autenticação com *JWT*, integração com *banco de dados PostgreSQL* e consumo de API pelo *frontend em HTML, CSS e JavaScript puro*.

O foco do projeto é demonstrar conceitos básicos de backend, segurança e comunicação entre frontend e backend.

---

## 🚀 Funcionalidades

- Cadastro de usuários (nome, email e senha)
- Validação de email duplicado
- Senha criptografada com **BCrypt**
- Login de usuário com email e senha
- Geração de *JWT (JSON Web Token)* no login
- Rotas protegidas com Spring Security + JWT
- Dashboard acessível apenas após autenticação
- Listagem de usuários no dashboard
- Atualização de nome e email do usuário
- Logout (remoção do token do navegador)

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT (jjwt)
- PostgreSQL
- Maven

### Frontend
- HTML5
- CSS3
- JavaScript (Fetch API)

---

## 🔐 Segurança

- Senhas armazenadas de forma criptografada utilizando **BCrypt**
- Autenticação stateless com **JWT**
- Rotas protegidas por filtro customizado (`JwtAuthFilter`)
- Token armazenado no `localStorage` e enviado via header `Authorization`

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Java 17** ou superior
- **Maven 3.6+**
- **PostgreSQL** (versão 12 ou superior)
- **IDE** (IntelliJ IDEA, Eclipse, VS Code, etc.)

## 🚀 Como Executar o Projeto

### 1. Configurar o Banco de Dados

Crie um banco de dados PostgreSQL chamado `cadastro_db`:

```sql
CREATE DATABASE cadastro_db;
```

### 2. Configurar as Credenciais do Banco

Edite o arquivo `src/main/resources/application.properties` e ajuste as credenciais do PostgreSQL conforme seu ambiente:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cadastro_db
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

### 3. Executar a Aplicação

#### Opção 1: Usando Maven
```bash
mvn spring-boot:run
```

#### Opção 2: Usando o Maven Wrapper
```bash
./mvnw spring-boot:run
```

No Windows:
```bash
mvnw.cmd spring-boot:run
```

#### Opção 3: Executar o JAR
```bash
mvn clean package
java -jar target/cadastro-0.0.1-SNAPSHOT.jar
```

### 4. Acessar a Aplicação

Após iniciar o servidor, a aplicação estará disponível em:
- **Frontend**: http://localhost:8080
- **API**: http://localhost:8080

## 📁 Estrutura do Projeto

```
cadastro/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/seuprojeto/cadastro/
│   │   │       ├── CadastroApplication.java      # Classe principal
│   │   │       ├── controller/
│   │   │       │   ├── AuthController.java       # Endpoints de autenticação
│   │   │       │   ├── UsuarioController.java    # Endpoints CRUD de usuários
│   │   │       │   └── GlobalExceptionHandler.java
│   │   │       ├── model/
│   │   │       │   └── Usuario.java              # Entidade Usuario
│   │   │       ├── repository/
│   │   │       │   └── UsuarioRepository.java    # Interface JPA Repository
│   │   │       ├── service/
│   │   │       │   └── UsuarioService.java       # Lógica de negócio
│   │   │       ├── security/
│   │   │       │   ├── SecurityConfig.java       # Configuração de segurança
│   │   │       │   ├── JwtService.java          # Serviço de geração/validação JWT
│   │   │       │   └── JwtAuthFilter.java        # Filtro de autenticação JWT
│   │   │       └── dto/
│   │   │           └── LoginRequest.java         # DTO para requisições de login
│   │   └── resources/
│   │       ├── application.properties            # Configurações da aplicação
│   │       └── static/
│   │           ├── index.html                    # Página de cadastro
│   │           ├── login.html                    # Página de login
│   │           ├── dashboard.html                # Dashboard de usuários
│   │           ├── css/
│   │           │   └── style.css                 # Estilos da aplicação
│   │           └── js/
│   │               ├── script.js                 # Lógica do cadastro
│   │               ├── login.js                  # Lógica do login
│   │               └── dashboard.js              # Lógica do dashboard
│   └── test/                                      # Testes unitários
├── pom.xml                                        # Dependências Maven
└── README.md
```

## 🔌 Endpoints da API

### Autenticação

#### POST `/auth/login`
Realiza login e retorna um token JWT.

**Request Body:**
```json
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "Bearer"
}
```

### Usuários

#### POST `/usuarios`
Cadastra um novo usuário (público, não requer autenticação).

**Request Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123"
}
```

#### GET `/usuarios`
Lista todos os usuários cadastrados (requer autenticação).

**Headers:**
```
Authorization: Bearer {token}
```

#### PUT `/usuarios/{id}`
Atualiza os dados de um usuário específico (requer autenticação).

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "nome": "João Silva Atualizado",
  "email": "joao.novo@email.com"
}
```

#### DELETE `/usuarios/{id}`
Exclui um usuário (requer autenticação).

**Headers:**
```
Authorization: Bearer {token}
```

## 🔐 Segurança

### Autenticação JWT
- Tokens têm validade de 1 hora
- Tokens são armazenados no `localStorage` do navegador
- Todas as requisições protegidas devem incluir o header `Authorization: Bearer {token}`

### Configuração de Segurança
- **CSRF**: Desabilitado (API REST stateless)
- **CORS**: Não configurado (aplicação roda no mesmo domínio)
- **Rotas públicas**:
  - `/` (página inicial)
  - `/index.html` (cadastro)
  - `/login.html`
  - `/cadastro.html`
  - `/dashboard.html`
  - `/auth/**` (endpoints de autenticação)
  - `/js/**`, `/css/**`, `/images/**` (arquivos estáticos)
  - `POST /usuarios` (cadastro público)

### Criptografia de Senhas
- Senhas são criptografadas usando **BCrypt** antes de serem salvas no banco
- A senha nunca é retornada nas respostas da API

## 🎨 Páginas do Frontend

### 1. Página de Cadastro (`index.html`)
- Permite cadastrar novos usuários
- Validação de campos obrigatórios
- Link para página de login

### 2. Página de Login (`login.html`)
- Autenticação com email e senha
- Armazena token JWT no localStorage
- Redireciona para dashboard após login bem-sucedido
- Link para página de cadastro

### 3. Dashboard (`dashboard.html`)
- Lista todos os usuários cadastrados
- Permite editar nome e email de cada usuário
- Botão de logout
- Requer autenticação (redireciona para login se não autenticado)

## 💾 Banco de Dados

### Tabela: `usuarios`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | BIGSERIAL | Chave primária (auto-incremento) |
| nome | VARCHAR | Nome do usuário (obrigatório) |
| email | VARCHAR | Email do usuário (único, obrigatório) |
| senha | VARCHAR | Senha criptografada (obrigatório) |

A tabela é criada automaticamente pelo Hibernate quando a aplicação inicia (`spring.jpa.hibernate.ddl-auto=update`).

## 🔧 Configurações Importantes

### application.properties

```properties
# Nome da aplicação
spring.application.name=cadastro

# Configuração do banco de dados
spring.datasource.url=jdbc:postgresql://localhost:5432/cadastro_db
spring.datasource.username=postgres
spring.datasource.password=sua_senha

# Configuração JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

## 🐛 Solução de Problemas

### Erro de conexão com o banco de dados
- Verifique se o PostgreSQL está rodando
- Confirme se as credenciais no `application.properties` estão corretas
- Certifique-se de que o banco `cadastro_db` foi criado

### Erro 403 ao fazer login
- Verifique se o endpoint está correto: `/auth/login`
- Confirme que o CSRF está desabilitado na configuração de segurança

### Token não funciona
- Tokens expiram após 1 hora
- Faça login novamente para obter um novo token
- Verifique se o header `Authorization` está sendo enviado corretamente

### Erro ao atualizar usuário
- Certifique-se de estar enviando o ID correto na URL
- Verifique se o email não está duplicado
- Confirme que o token JWT está válido

## 📝 Próximos Passos (Melhorias Sugeridas)

- [ ] Implementar refresh token
- [ ] Adicionar validação de força de senha
- [ ] Implementar recuperação de senha
- [ ] Adicionar testes unitários e de integração
- [ ] Implementar paginação na listagem de usuários
- [ ] Adicionar busca/filtros no dashboard
- [ ] Implementar roles/permissões de usuário
- [ ] Adicionar confirmação antes de excluir usuário
- [ ] Melhorar tratamento de erros no frontend
- [ ] Adicionar loading states nas requisições

## 👨‍💻 Desenvolvimento

### Padrões Utilizados
- **MVC (Model-View-Controller)**: Separação de responsabilidades
- **Repository Pattern**: Abstração da camada de dados
- **Service Layer**: Lógica de negócio isolada
- **DTO (Data Transfer Object)**: Transferência de dados entre camadas

### Boas Práticas Implementadas
- Injeção de dependências via construtor
- Validação de dados de entrada
- Tratamento de exceções centralizado
- Criptografia de senhas
- Autenticação stateless com JWT
- Código limpo e organizado

## 📄 Licença

Este projeto é um exemplo educacional e pode ser usado livremente para fins de aprendizado.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

*Desenvolvido para estudar Java*
