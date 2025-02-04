import express from 'express';
import { listarProdutos, criarProduto, verProdutoPorId, atualizarProdutoPorId, deletarProdutoPorId } from '../controllers/produto.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', listarProdutos);
router.post('/', criarProduto);
router.get('/:id', verProdutoPorId);
router.put('/:id', atualizarProdutoPorId); // Changed from patch to put
router.delete('/:id', deletarProdutoPorId);

export default router;