import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { 
    criarAcompanhamento, 
    verAcompanhamentoPorId, 
    atualizarAcompanhamentoPorId, 
    deletarAcompanhamentoPorId, 
    listarAcompanhamentos 
} from '../controllers/acompanhamento.controller.js';

const router = express.Router();

router.get('/', listarAcompanhamentos);
router.post('/', criarAcompanhamento);
router.get('/:id', verAcompanhamentoPorId);
router.put('/:id', atualizarAcompanhamentoPorId); // Changed from PATCH to PUT
router.delete('/:id', deletarAcompanhamentoPorId);

export default router;