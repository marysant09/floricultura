const clienteService = require('../services/clienteService');

class ClienteController {
    async criar(req, res) {
        try {
            const novoCliente = await clienteService.criarCliente(req.body);
            return res.status(201).json(novoCliente);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async listarTodos(req, res) {
        try {
            const clientes = await clienteService.listarClientes();
            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const cliente = await clienteService.buscarClientePorId(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado.' });
            }
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const clienteAtualizado = await clienteService.atualizarCliente(id, req.body);
            return res.status(200).json(clienteAtualizado);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;
            await clienteService.deletarCliente(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ClienteController();