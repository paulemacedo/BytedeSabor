import express from 'express'
import { criarProduto, verProduto, atualizarProduto, deletarProduto } from '../controllers/produto.controller.js'

const router = express.Router();

router.post('/', criarProduto);
router.get('/', verProduto);
router.patch('/', atualizarProduto);
router.delete('/', deletarProduto);

export default router;