import Acompanhamento from "../models/acompanhamento.model.js";

// CRUD ACOMPANHAMENTO
export const criarAcompanhamento = async (req, res) => {
    const acompanhamento = req.body;
    if (!acompanhamento.id || !acompanhamento.tipo || !acompanhamento.imagem || !acompanhamento.nome || !acompanhamento.preco) {
        return res.status(400).json({
            success: false,
            message: 'Faltando dados.'
        });
    }
    const novoAcompanhamento = new Acompanhamento(acompanhamento);
    try {
        await novoAcompanhamento.save();
        res.status(201).json({
            success: true,
            message: 'Acompanhamento adicionado.',
            acompanhamento: novoAcompanhamento
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const verAcompanhamentoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const acompanhamento = await Acompanhamento.findById(id);
        if (!acompanhamento) {
            return res.status(404).json({
                success: false,
                message: 'Acompanhamento não encontrado.'
            });
        }
        res.status(200).json({
            success: true,
            acompanhamento
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const atualizarAcompanhamentoPorId = async (req, res) => {
    const { id } = req.params;
    const acompanhamentoAtualizado = req.body;
    try {
        const acompanhamento = await Acompanhamento.findByIdAndUpdate(id, acompanhamentoAtualizado, { new: true });
        if (!acompanhamento) {
            return res.status(404).json({
                success: false,
                message: 'Acompanhamento não encontrado.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Acompanhamento atualizado.',
            acompanhamento
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deletarAcompanhamentoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const acompanhamento = await Acompanhamento.findByIdAndDelete(id);
        if (!acompanhamento) {
            return res.status(404).json({
                success: false,
                message: 'Acompanhamento não encontrado.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Acompanhamento deletado.'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};