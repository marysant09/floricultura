const pedidoService = require('../services/pedidoService');

class PedidoController {
    async criar(req, res) {
        try {
            const novoPedido = await pedidoService.criarPedido(req.body);
            return res.status(201).json(novoPedido);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async listarTodos(req, res) {
        try {
            const pedidos = await pedidoService.listarPedidos();
            return res.status(200).json(pedidos);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const pedido = await pedidoService.buscarPedidoPorId(id);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }
            return res.status(200).json(pedido);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async atualizarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const pedidoAtualizado = await pedidoService.atualizarStatusPedido(id, status);
            return res.status(200).json(pedidoAtualizado);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;
            await pedidoService.deletarPedido(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new PedidoController();