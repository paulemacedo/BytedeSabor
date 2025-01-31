import express from 'express'
import { criarPedido, verPedidoPorId, atualizarPedidoPorId, deletarPedidoPorId } from '../controllers/pedido.controller.js';

const router = express.Router();

router.post('/', criarPedido);
router.get('/', verPedidoPorId);
router.patch('/', atualizarPedidoPorId);
router.delete('/', deletarPedidoPorId);

export default router;