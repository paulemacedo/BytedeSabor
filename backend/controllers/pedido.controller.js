import Pedido from '../models/pedido.model.js';

// CRIAR PEDIDO, OK
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
    const pedidoAtualizado = req.body;
}

// DELETAR PEDIDO POR ID, OK
export const deletarPedidoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        await Pedido.findByIdAndDelete(id);
        res.status(201).json({ success: true, message: 'pedido deletado'})
    } catch (error) {
        console.error("Erro: ", error.message);
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}
