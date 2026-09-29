const db = require('../config/db');

class ClienteRepository {
    async criar(cliente) {
        const { nome, email, telefone } = cliente;
        const query = `
            INSERT INTO cliente (nome, email, telefone) 
            VALUES ($1, $2, $3) 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [nome, email, telefone]);
        return rows[0];
    }

    async listarTodos() {
        const query = 'SELECT * FROM cliente ORDER BY id_cliente ASC;';
        const { rows } = await db.query(query);
        return rows;
    }

    async buscarPorId(id) {
        const query = 'SELECT * FROM cliente WHERE id_cliente = $1;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    async buscarPorEmail(email) {
        const query = 'SELECT * FROM cliente WHERE email = $1;';
        const { rows } = await db.query(query, [email]);
        return rows[0];
    }

    async atualizar(id, cliente) {
        const { nome, email, telefone } = cliente;
        const query = `
            UPDATE cliente 
            SET nome = $1, email = $2, telefone = $3 
            WHERE id_cliente = $4 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [nome, email, telefone, id]);
        return rows[0];
    }

    async deletar(id) {
        const query = 'DELETE FROM cliente WHERE id_cliente = $1;';
        await db.query(query, [id]);
    }
}

module.exports = new ClienteRepository();