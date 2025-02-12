import mongoose from 'mongoose';
import Acompanhamento from "../models/acompanhamento.model.js";

// Função para gerar um ID de 24 caracteres hexadecimais
const generateHexId = () => {
  return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

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
    if (!acompanhamento.nome || acompanhamento.preco === undefined) { // Permitir que o preço seja 0
        return res.status(400).json({
            success: false,
            message: 'Faltando dados obrigatórios (nome e preço são necessários)'
        });
    }

    try {
        acompanhamento._id = generateHexId(); // Adiciona o ID aqui
        const novoAcompanhamento = new Acompanhamento(acompanhamento);
        await novoAcompanhamento.save();
        
        res.status(201).json({ // Status 201 para criação
            success: true,
            message: 'Acompanhamento adicionado',
            acompanhamento: novoAcompanhamento
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'Erro ao salvar o acompanhamento'
        });
    }
};

export const verAcompanhamentoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Buscando acompanhamento com ID:", id);
        const acompanhamento = await Acompanhamento.findById(id);
        if (!acompanhamento) {
            console.log("Nenhum acompanhamento encontrado para o ID:", id);
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
        const acompanhamentoAtualizado = await Acompanhamento.findByIdAndUpdate(
            id,
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
            message: 'Acompanhamento atualizado.',
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
        const acompanhamentoDeletado = await Acompanhamento.findByIdAndDelete(id);
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