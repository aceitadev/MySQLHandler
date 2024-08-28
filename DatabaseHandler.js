const mysql = require('mysql2/promise');

class Database {
    constructor(config) {
        this.connection = null;
        this.config = config;
    }

    async connect() {
        if (!this.connection) {
            try {
                this.connection = await mysql.createConnection(this.config);
            } catch (error) {
                console.error('Erro ao conectar ao banco de dados:', error.message);
                throw error;
            }
        }
    }

    async set(table, column, value) {
        await this.connect();
        try {
            const query = `INSERT INTO \`${table}\` (\`${column}\`) VALUES (?) ON DUPLICATE KEY UPDATE \`${column}\` = VALUES(\`${column}\`)`;
            await this.connection.execute(query, [value]);
        } catch (error) {
            console.error('Erro ao executar o método set:', error.message);
            throw error;
        }
    }

    async delete(table, column, value) {
        await this.connect();
        try {
            const query = `DELETE FROM \`${table}\` WHERE \`${column}\` = ?`;
            await this.connection.execute(query, [value]);
        } catch (error) {
            console.error('Erro ao executar o método delete:', error.message);
            throw error;
        }
    }

    async get(table, whereColumn, columnValue) {
        await this.connect();
        try {
            const query = `SELECT * FROM \`${table}\` WHERE \`${whereColumn}\` = ? LIMIT 1`;
            const [rows] = await this.connection.execute(query, [columnValue]);
            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error('Erro ao executar o método get:', error.message);
            throw error;
        }
    }

    async update(table, column, value, whereColumn, whereValue) {
        await this.connect();
        try {
            const query = `UPDATE \`${table}\` SET \`${column}\` = ? WHERE \`${whereColumn}\` = ?`;
            await this.connection.execute(query, [value, whereValue]);
        } catch (error) {
            console.error('Erro ao executar o método update:', error.message);
            throw error;
        }
    }

    async insert(table, data) {
        await this.connect();
        try {
            const columns = Object.keys(data).map(column => `\`${column}\``).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const query = `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`;
            await this.connection.execute(query, values);
        } catch (error) {
            console.error('Erro ao executar o método insert:', error.message);
            throw error;
        }
    }

    async createTable(table, columns) {
        await this.connect();
        try {
            const checkTableQuery = `SHOW TABLES LIKE '${table}'`;
            const [tables] = await this.connection.execute(checkTableQuery);
            if (tables.length > 0) return;

            const columnDefinitions = Object.entries(columns)
                .map(([column, type]) => `\`${column}\` ${type}`)
                .join(', ');

            const query = `CREATE TABLE \`${table}\` (${columnDefinitions})`;
            await this.connection.execute(query);
        } catch (error) {
            console.error('Erro ao executar o método createTable:', error.message);
            throw error;
        }
    }

    async close() {
        if (this.connection) {
            try {
                await this.connection.end();
            } catch (error) {
                console.error('Erro ao fechar a conexão com o banco de dados:', error.message);
            } finally {
                this.connection = null;
            }
        }
    }
}

module.exports = Database;
