const clienteRepository = require('../repositories/clienteRepository');

class ClienteService {
    async criarCliente(dadosCliente) {
        const { nome, email } = dadosCliente;

        if (!nome || !email) {
            throw new Error('Nome e E-mail são obrigatórios.');
        }

        const clienteExistente = await clienteRepository.buscarPorEmail(email);
        if (clienteExistente) {
            throw new Error('E-mail já cadastrado.');
        }

        return await clienteRepository.criar(dadosCliente);
    }

    async listarClientes() {
        return await clienteRepository.listarTodos();
    }

    async buscarClientePorId(id) {
        return await clienteRepository.buscarPorId(id);
    }

    async atualizarCliente(id, dadosCliente) {
        const cliente = await clienteRepository.buscarPorId(id);
        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }
        return await clienteRepository.atualizar(id, dadosCliente);
    }

    async deletarCliente(id) {
        const cliente = await clienteRepository.buscarPorId(id);
        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }
        await clienteRepository.deletar(id);
    }
}

module.exports = new ClienteService();