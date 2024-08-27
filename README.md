# 📦 MySQLHandler

Um pequeno handler de conexão e manipulação de dados em MySQL usando Node.js. Este handler oferece métodos simples para conectar-se ao banco de dados, criar tabelas, inserir, atualizar, excluir e buscar dados.

## 🚀 Funcionalidades

- **📡 Conectar ao Banco de Dados**: Conexão simples e fácil com o MySQL.
- **➕ Inserção de Dados**: Adicione novos registros ao banco de dados.
- **🔄 Atualização de Dados**: Atualize registros existentes com base em condições específicas.
- **❌ Exclusão de Dados**: Remova registros do banco de dados.
- **🔍 Consulta de Dados**: Busque registros específicos com base em colunas e valores.
- **🆕 Criação de Tabelas**: Crie novas tabelas no banco de dados.

## 📚 Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/aceitadev/MySQLHandler.git
   ```
2. Instale as dependências:
   ```bash
   npm install mysql2
   ```

## 🛠️ Como Usar

### 1. Configuração da Conexão

```javascript
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'discord_bot'
};

const db = new Database(dbConfig);
```

### 2. Criar uma Nova Tabela

```javascript
const columns = {
    user_id: 'VARCHAR(255) PRIMARY KEY',
    username: 'VARCHAR(255)',
    active: 'BOOLEAN'
};

await db.createTable('users', columns);
```

### 3. Inserir um Novo Registro

```javascript
const data = {
    user_id: '123456789',
    username: 'john_doe',
    active: true
};

await db.insert('users', data);
```

### 4. Atualizar um Registro

```javascript
await db.update('users', 'active', true, 'user_id', '123456789');
```

### 5. Excluir um Registro

```javascript
await db.delete('users', 'user_id', '123456789');
```

### 6. Buscar um Registro

```javascript
const user = await db.get('users', 'user_id', '123456789');
console.log(user);
```

### 7. Fechar Conexão

```javascript
await db.close();
```

## 📝 Exemplo Completo

```javascript
const Database = require('./Database');

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'database'
};

const db = new Database(dbConfig);

(async () => {
    // Criar uma nova tabela
    const columns = {
        user_id: 'VARCHAR(255) PRIMARY KEY',
        username: 'VARCHAR(255)',
        active: 'BOOLEAN'
    };
    await db.createTable('users', columns);

    // Inserir um novo usuário
    const data = {
        user_id: '123456789',
        username: 'john_doe',
        active: true
    };
    await db.insert('users', data);

    // Atualizar o status de um usuário
    await db.update('users', 'active', true, 'user_id', '123456789');

    // Buscar um usuário pelo ID
    const user = await db.get('users', 'user_id', '123456789');
    console.log(user);

    // Deletar um usuário
    await db.delete('users', 'user_id', '123456789');

    // Fechar a conexão
    await db.close();
})();
```
