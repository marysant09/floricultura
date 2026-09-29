const pedidoRepository = require('../repositories/pedidoRepository');
const clienteRepository = require('../repositories/clienteRepository');

class PedidoService {
    async criarPedido(dadosPedido) {
        const { id_cliente, itens, status } = dadosPedido;

        if (!id_cliente) {
            throw new Error('ID do cliente é obrigatório.');
        }

        if (!itens || !Array.isArray(itens) || itens.length === 0) {
            throw new Error('O pedido deve conter pelo menos um item.');
        }

        const cliente = await clienteRepository.buscarPorId(id_cliente);
        if (!cliente) {
            throw new Error('Cliente informado não existe.');
        }

        return await pedidoRepository.criar(id_cliente, status, itens);
    }

    async listarPedidos() {
        return await pedidoRepository.listarTodos();
    }

    async buscarPedidoPorId(id) {
        return await pedidoRepository.buscarPorId(id);
    }

    async atualizarStatusPedido(id, status) {
        if (!status) {
            throw new Error('O novo status deve ser informado.');
        }

        const pedido = await pedidoRepository.buscarPorId(id);
        if (!pedido) {
            throw new Error('Pedido não encontrado.');
        }

        return await pedidoRepository.atualizarStatus(id, status);
    }

    async deletarPedido(id) {
        const pedido = await pedidoRepository.buscarPorId(id);
        if (!pedido) {
            throw new Error('Pedido não encontrado.');
        }
        await pedidoRepository.deletar(id);
    }
}

module.exports = new PedidoService();