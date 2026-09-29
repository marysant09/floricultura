const produtoRepository = require('../repositories/produtoRepository');

class ProdutoService {
    async criarProduto(dadosProduto) {
        const { nome, preco } = dadosProduto;

        if (!nome || preco === undefined) {
            throw new Error('Nome e preço do produto são obrigatórios.');
        }

        if (preco <= 0) {
            throw new Error('O preço deve ser maior que zero.');
        }

        return await produtoRepository.criar(dadosProduto);
    }

    async listarProdutos() {
        return await produtoRepository.listarTodos();
    }

    async buscarProdutoPorId(id) {
        return await produtoRepository.buscarPorId(id);
    }

    async atualizarProduto(id, dadosProduto) {
        const produto = await produtoRepository.buscarPorId(id);
        if (!produto) {
            throw new Error('Produto não encontrado.');
        }
        return await produtoRepository.atualizar(id, dadosProduto);
    }

    async deletarProduto(id) {
        const produto = await produtoRepository.buscarPorId(id);
        if (!produto) {
            throw new Error('Produto não encontrado.');
        }
        await produtoRepository.deletar(id);
    }
}

module.exports = new ProdutoService();