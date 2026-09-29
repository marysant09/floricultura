const db = require('../config/db');

class ProdutoRepository {
    async criar(produto) {
        const { nome, categoria, preco, estoque } = produto;
        const query = `
            INSERT INTO produto (nome, categoria, preco, estoque) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [nome, categoria, preco, estoque]);
        return rows[0];
    }

    async listarTodos() {
        const query = 'SELECT * FROM produto ORDER BY id_produto ASC;';
        const { rows } = await db.query(query);
        return rows;
    }

    async buscarPorId(id) {
        const query = 'SELECT * FROM produto WHERE id_produto = $1;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    async atualizar(id, produto) {
        const { nome, categoria, preco, estoque } = produto;
        const query = `
            UPDATE produto 
            SET nome = $1, categoria = $2, preco = $3, estoque = $4 
            WHERE id_produto = $5 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [nome, categoria, preco, estoque, id]);
        return rows[0];
    }

    async deletar(id) {
        const query = 'DELETE FROM produto WHERE id_produto = $1;';
        await db.query(query, [id]);
    }
}

module.exports = new ProdutoRepository();