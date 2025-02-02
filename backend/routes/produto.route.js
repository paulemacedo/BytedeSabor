import express from 'express'
import { criarProduto, verProdutoPorId, atualizarProdutoPorId, deletarProdutoPorId } from '../controllers/produto.controller.js'

const router = express.Router();

router.post('/', criarProduto);
router.get('/:id', verProdutoPorId);
router.patch('/:id', atualizarProdutoPorId);
router.delete('/:id', deletarProdutoPorId);

export default router;