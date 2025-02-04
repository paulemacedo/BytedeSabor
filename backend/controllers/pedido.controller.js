import Pedido from '../models/pedido.model.js';

const generateHexId = () => {
    return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

// CRIAR PEDIDO, OK
export const criarPedido = async (req, res) => {
    const { preco, pago, usuario, status, items, date } = req.body;

    if (!preco || !usuario || !items) {
        console.error('Campos obrigatórios não fornecidos:', { preco, usuario, items });
        return res.status(400).json({ success: false, message: 'Campos obrigatórios não fornecidos.' });
    }

    const pedido = {
        _id: generateHexId(), // Gera o ID manualmente
        preco,
        pago: pago || false,
        usuario,
        status: status || 'aguardando confirmação', // Define o status padrão se não fornecido
        items,
        date: date || new Date() // Define a data atual se não fornecida
    };

    const novoPedido = new Pedido(pedido);
    try {
        await novoPedido.save();
        res.status(201).json({
            success: true,
            message: 'Pedido Criado.',
            pedido: novoPedido
        });
    } catch(error) {
        console.error('Erro ao criar pedido:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// LISTAR TODOS OS PEDIDOS
export const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate('usuario');
        res.status(200).json({ success: true, pedidos });
    } catch (error) {
        console.error('Erro ao listar pedidos:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// LISTAR PEDIDOS POR USUÁRIO
export const listarPedidosPorUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    try {
        const pedidos = await Pedido.find({ usuario: usuarioId }).populate('usuario');
        res.status(200).json({ success: true, pedidos });
    } catch (error) {
        console.error('Erro ao listar pedidos por usuário:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const verPedidoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findById(id).populate('usuario');
        if (!pedido) {
            return res.status(404).json({ success: false, message: 'Pedido não encontrado.' });
        }
        res.status(200).json({ success: true, pedido });
    } catch (error) {
        console.error('Erro ao ver pedido por ID:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const atualizarPedidoPorId = async (req, res) => {
    const { id } = req.params;
    const pedidoAtualizado = req.body;
    try {
        const pedido = await Pedido.findByIdAndUpdate(id, pedidoAtualizado, { new: true });
        if (!pedido) {
            return res.status(404).json({ success: false, message: 'Pedido não encontrado.' });
        }
        res.status(200).json({ success: true, message: 'Pedido atualizado.', pedido });
    } catch (error) {
        console.error('Erro ao atualizar pedido por ID:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// DELETAR PEDIDO POR ID, OK
export const deletarPedidoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        await Pedido.findByIdAndDelete(id);
        res.status(201).json({ success: true, message: 'Pedido deletado' });
    } catch (error) {
        console.error('Erro ao deletar pedido por ID:', error.message);
        res.status(401).json({ success: false, message: error.message });
    }
}