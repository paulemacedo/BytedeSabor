import mongoose from 'mongoose';
import Acompanhamento from "../models/acompanhamento.model.js";

// CRUD ACOMPANHAMENTO

export const listarAcompanhamentos = async (req, res) => {
    try {
      const acompanhamentos = await Acompanhamento.find();
      res.status(200).json({
        success: true,
        acompanhamentos
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

export const criarAcompanhamento = async (req, res) => {
    const acompanhamento = req.body;
    if (!acompanhamento.tipo || !acompanhamento.nome || !acompanhamento.preco) {
        return res.status(400).json({
            success: false,
            message: 'Faltando dados obrigatórios'
        });
    }
    const novoAcompanhamento = new Acompanhamento(acompanhamento);
    try {
        await novoAcompanhamento.save();
        res.status(201).json({
            success: true,
            message: 'Acompanhamento adicionado',
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
    try {
        const { id } = req.params;
        console.log("Buscando acompanhamento com ID:", id);
        const acompanhamento = await Acompanhamento.findOne({ _id: id });
        if (!acompanhamento) {
            console.log("Nenhum acompanhamento encontrado para o ID:", id);
            console.log("ID recebido:", id);
            console.log("Tipo do ID:", typeof id); // Deve ser 'string'
            return res.status(404).json({
                success: false,
                message: `Acompanhamento não encontrado com identificador: ${id}`
            });
        }
        console.log("Acompanhamento encontrado:", acompanhamento);
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
    try {
        const { id } = req.params;
        const dadosAtualizacao = req.body;
        const acompanhamentoAtualizado = await Acompanhamento.findOneAndUpdate(
            { _id: id },
            dadosAtualizacao,
            { new: true }
        );
        if (!acompanhamentoAtualizado) {
            return res.status(404).json({
                success: false,
                message: `Acompanhamento não encontrado com identificador: ${id}`
            });
        }
        res.status(200).json({
            success: true,
            acompanhamento: acompanhamentoAtualizado
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
    try {
        const { id } = req.params;
        const acompanhamentoDeletado = await Acompanhamento.findOneAndDelete({ _id: id });
        if (!acompanhamentoDeletado) {
            return res.status(404).json({
                success: false,
                message: `Acompanhamento não encontrado com identificador: ${id}`
            });
        }
        res.status(200).json({
            success: true,
            message: 'Acompanhamento deletado com sucesso.'
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};