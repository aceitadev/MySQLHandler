const mysql = require('mysql2/promise');

class Database {
    constructor(config) {
        this.connection = null;
        this.config = config;
    }

    async connect() {
        if (!this.connection) {
            this.connection = await mysql.createConnection(this.config);
        }
    }

    async set(table, column, value) {
        await this.connect();
        const query = `INSERT INTO ?? (??) VALUES (?) ON DUPLICATE KEY UPDATE ?? = VALUES(??)`;
        const values = [table, column, value, column, column];
        await this.connection.execute(query, values);
    }

    async delete(table, column, value) {
        await this.connect();
        const query = `DELETE FROM ?? WHERE ?? = ?`;
        const values = [table, column, value];
        await this.connection.execute(query, values);
    }

    async get(table, whereColumn, columnValue) {
        await this.connect();
        const query = `SELECT * FROM ?? WHERE ?? = ? LIMIT 1`;
        const values = [table, whereColumn, columnValue];
        const [rows] = await this.connection.execute(query, values);
        return rows.length ? rows[0] : null;
    }

    async update(table, column, value, whereColumn, whereValue) {
        await this.connect();
        const query = `UPDATE ?? SET ?? = ? WHERE ?? = ?`;
        const values = [table, column, value, whereColumn, whereValue];
        await this.connection.execute(query, values);
    }

    async insert(table, data) {
        await this.connect();
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);

        const query = `INSERT INTO ?? (${columns}) VALUES (${placeholders})`;
        const queryValues = [table, ...values];
        await this.connection.execute(query, queryValues);
    }

    async close() {
        if (this.connection) {
            await this.connection.end();
            this.connection = null;
        }
    }
}

module.exports = Database;
