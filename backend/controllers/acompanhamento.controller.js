import Acompanhamento from "../models/acompanhamento.model.js";

// CRUD ACOMPANHAMENTO
export const criarAcompanhamento = async (req, res) => {
    const acompanhamento = req.body;
    if(!acompanhamento.id || !acompanhamento.tipo || !acompanhamento.imagem || !acompanhamento.nome || !acompanhamento.preco){
        return res.status(400).json({
            success: false,
            message: 'Faltando dados.'
        })
    }
    const novoAcompanhamento = new Acompanhamento(acompanhamento);
    try {
        await novoAcompanhamento.save();
        res.status(201).json({
            success: true,
            message: 'Acompanhamento adicionado.'
        });
    } catch(error) {
        console.error(error.message);
        res.status(500);
    }
};

export const verAcompanhamentoPorId = async (req, res) => {
    const { id } = req.params;
    console.log('READ ainda não implementado.');
    return res.json({
        message: 'ainda nao implementado'
    })
};

export const atualizarAcompanhamentoPorId = async (req, res) => {
    const { id } = req.params;
    const acompanhamentoAtualizado = req.body;
};

// DELETAR ACOMPANHAMENTO POR ID, OK
export const deletarAcompanhamentoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        await Acompanhamento.findByIdAndDelete(id);
        res.status(201).json({ success: true, message: 'acompanhamento deletado'})
    } catch (error) {
        console.error("Erro: ", error.message);
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}