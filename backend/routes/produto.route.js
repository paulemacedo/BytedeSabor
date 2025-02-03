import express from 'express';
import { listarProdutos, criarProduto, verProdutoPorId, atualizarProdutoPorId, deletarProdutoPorId } from '../controllers/produto.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', listarProdutos); // Adicione esta linha
router.post('/', criarProduto);
router.get('/:id', verProdutoPorId);
router.patch('/:id', atualizarProdutoPorId);
router.delete('/:id', deletarProdutoPorId);

export default router;