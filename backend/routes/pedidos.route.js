import express from 'express'
import { criarPedido, verPedidoPorId, atualizarPedidoPorId, deletarPedidoPorId } from '../controllers/pedido.controller.js';

const router = express.Router();

router.post('/', criarPedido);
router.get('/:id', verPedidoPorId);
router.patch('/:id', atualizarPedidoPorId);
router.delete('/:id', deletarPedidoPorId);

export default router;