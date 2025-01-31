import Pedido from '../models/pedido.model.js';

// CRUD PEDIDO
export const criarPedido = async (req, res) => {
    const pedido = req.body;
    const novoPedido = new Pedido(pedido);
    try {
        await novoPedido.save();
        res.status(201).json({
            success: true,
            message: 'Pedido Criado.'
        });
    } catch(error) {
        console.error(error.message);
        res.status(500);
    }
}

export const verPedidoPorId = async (req, res) => {
    const { id } = req.params;
}

export const atualizarPedidoPorId = async (req, res) => {
    const { id } = req.params;
}

export const deletarPedidoPorId = async (req, res) => {
    const { id } = req.params;
}