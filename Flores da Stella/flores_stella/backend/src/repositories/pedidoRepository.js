const db = require('../config/db');

class PedidoRepository {
    async criar(id_cliente, status, itens) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            // 1. Cria o Pedido
            const queryPedido = `
                INSERT INTO pedido (id_cliente, status, data_pedido) 
                VALUES ($1, $2, NOW()) 
                RETURNING *;
            `;
            const { rows: pedidoRows } = await client.query(queryPedido, [id_cliente, status || 'Pendente']);
            const novoPedido = pedidoRows[0];

            // 2. Insere os Itens do Pedido (item_pedido)
            for (const item of itens) {
                const queryItem = `
                    INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco_unitario) 
                    VALUES ($1, $2, $3, $4);
                `;
                await client.query(queryItem, [
                    novoPedido.id_pedido, 
                    item.id_produto, 
                    item.quantidade, 
                    item.preco_unitario
                ]);
            }

            await client.query('COMMIT');
            return novoPedido;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async listarTodos() {
        const query = `
            SELECT p.id_pedido, p.data_pedido, p.status, c.nome AS nome_cliente 
            FROM pedido p
            JOIN cliente c ON p.id_cliente = c.id_cliente
            ORDER BY p.id_pedido DESC;
        `;
        const { rows } = await db.query(query);
        return rows;
    }

    async buscarPorId(id) {
        const queryPedido = `
            SELECT p.*, c.nome, c.email 
            FROM pedido p
            JOIN cliente c ON p.id_cliente = c.id_cliente
            WHERE p.id_pedido = $1;
        `;
        const queryItens = `
            SELECT ip.*, prod.nome AS nome_produto 
            FROM item_pedido ip
            JOIN produto prod ON ip.id_produto = prod.id_produto
            WHERE ip.id_pedido = $1;
        `;
        const { rows: pedidoRows } = await db.query(queryPedido, [id]);
        if (pedidoRows.length === 0) return null;

        const { rows: itensRows } = await db.query(queryItens, [id]);
        return {
            ...pedidoRows[0],
            itens: itensRows
        };
    }

    async atualizarStatus(id, status) {
        const query = `
            UPDATE pedido 
            SET status = $1 
            WHERE id_pedido = $2 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [status, id]);
        return rows[0];
    }

    async deletar(id) {
        const query = 'DELETE FROM pedido WHERE id_pedido = $1;';
        await db.query(query, [id]);
    }
}

module.exports = new PedidoRepository();