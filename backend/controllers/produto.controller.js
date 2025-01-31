import Produto from '../models/produto.model.js'

export const criarProduto = async (req, res) => {
    const produto = req.body;
    if(!produto.id || !produto.tipo || !produto.imagem || !produto.nome || !produto.preco){
        return res.status(400).json({
            success: false,
            message: 'Faltando dados.'
        })
    }
    const newProduto = new Produto(produto);
    try {
        await newProduto.save();
        res.status(201).json({
            success: true,
            message: 'Produto adicionado.'
        });
    } catch(error) {
        console.error(error.message);
        res.status(500);
    }
};

export const verProduto = async (req, res) => {
    console.log('READ ainda não implementado.');
    return res.json({
        message: 'ainda nao implementado'
    })
};

export const atualizarProduto = async (req, res) => {
    console.log('UPDATE ainda não implementado.')
};

export const deletarProduto = async (req, res) => {
    console.log('DELETE ainda não implementado.')
};
