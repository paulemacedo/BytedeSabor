import express from 'express';
import { criarAcompanhamento, verAcompanhamentoPorId, atualizarAcompanhamentoPorId, deletarAcompanhamentoPorId, listarAcompanhamentos } from '../controllers/acompanhamento.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', criarAcompanhamento);
router.get('/', listarAcompanhamentos); // Add this line
router.get('/:id', verAcompanhamentoPorId);
router.patch('/:id', atualizarAcompanhamentoPorId);
router.delete('/:id', deletarAcompanhamentoPorId);

export default router;