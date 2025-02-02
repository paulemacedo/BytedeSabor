import Produto from '../models/produto.model.js'

// CRUD PRODUTO
export const criarProduto = async (req, res) => {
    const produto = req.body;
    if(!produto.id || !produto.tipo || !produto.imagem || !produto.nome || !produto.preco){
        return res.status(400).json({
            success: false,
            message: 'Faltando dados.'
        })
    }
    const novoProduto = new Produto(produto);
    try {
        await novoProduto.save();
        res.status(201).json({
            success: true,
            message: 'Produto adicionado.'
        });
    } catch(error) {
        console.error(error.message);
        res.status(500);
    }
};

export const verProdutoPorId = async (req, res) => {
    const { id } = req.params;
    console.log('READ ainda não implementado.');
    return res.json({
        message: 'ainda nao implementado'
    })
};

export const atualizarProdutoPorId = async (req, res) => {
    const { id } = req.params;
    const produtoAtualizado = req.body;
};

// DELETAR PRODUTO POR ID, OK
export const deletarProdutoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        await Produto.findByIdAndDelete(id);
        res.status(201).json({ success: true, message: 'produto deletado'})
    } catch (error) {
        console.error("Erro: ", error.message);
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

