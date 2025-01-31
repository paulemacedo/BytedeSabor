import express from 'express'
import { criarProduto, verProdutoPorId, atualizarProdutoPorId, deletarProdutoPorId } from '../controllers/produto.controller.js'

const router = express.Router();

router.post('/', criarProduto);
router.get('/', verProdutoPorId);
router.patch('/', atualizarProdutoPorId);
router.delete('/', deletarProdutoPorId);

export default router;