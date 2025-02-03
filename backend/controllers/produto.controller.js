import Produto from '../models/produto.model.js';

// CRUD PRODUTO
export const criarProduto = async (req, res) => {
    const produto = req.body;
    if (!produto.id || !produto.tipo || !produto.imagem || !produto.nome || !produto.preco) {
        return res.status(400).json({
            success: false,
            message: 'Faltando dados.'
        });
    }
    const novoProduto = new Produto(produto);
    try {
        await novoProduto.save();
        res.status(201).json({
            success: true,
            message: 'Produto adicionado.',
            produto: novoProduto
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const verProdutoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await Produto.findById(id);
        if (!produto) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado.'
            });
        }
        res.status(200).json({
            success: true,
            produto
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const atualizarProdutoPorId = async (req, res) => {
    const { id } = req.params;
    const produtoAtualizado = req.body;
    try {
        const produto = await Produto.findByIdAndUpdate(id, produtoAtualizado, { new: true });
        if (!produto) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Produto atualizado.',
            produto
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deletarProdutoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await Produto.findByIdAndDelete(id);
        if (!produto) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Produto deletado.'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};