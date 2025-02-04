import express from 'express';
import { criarPedido, listarPedidos, listarPedidosPorUsuario, verPedidoPorId, atualizarPedidoPorId, deletarPedidoPorId } from '../controllers/pedido.controller.js';

const router = express.Router();

router.post('/', criarPedido);
router.get('/', listarPedidos); // Adiciona a rota para listar todos os pedidos
router.get('/usuario/:usuarioId', listarPedidosPorUsuario); // Adiciona a rota para listar pedidos por usuário
router.get('/:id', verPedidoPorId);
router.put('/:id', atualizarPedidoPorId);
router.delete('/:id', deletarPedidoPorId);

export default router;