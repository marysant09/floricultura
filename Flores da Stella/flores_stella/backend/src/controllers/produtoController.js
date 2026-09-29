const produtoService = require('../services/produtoService');

class ProdutoController {
    async criar(req, res) {
        try {
            const novoProduto = await produtoService.criarProduto(req.body);
            return res.status(201).json(novoProduto);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async listarTodos(req, res) {
        try {
            const produtos = await produtoService.listarProdutos();
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const produto = await produtoService.buscarProdutoPorId(id);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado.' });
            }
            return res.status(200).json(produto);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const produtoAtualizado = await produtoService.atualizarProduto(id, req.body);
            return res.status(200).json(produtoAtualizado);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;
            await produtoService.deletarProduto(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ProdutoController();