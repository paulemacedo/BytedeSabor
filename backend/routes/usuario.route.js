import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { listarUsuarios, criarUsuario, verUsuarioPorId, atualizarUsuarioPorId, deletarUsuarioPorId, checkEmailExists, updatePassword } from '../controllers/usuario.controller.js';

const router = express.Router();

router.post('/', criarUsuario);
router.get('/', listarUsuarios);
router.get('/:id', verUsuarioPorId);
router.put('/:id', atualizarUsuarioPorId);
router.delete('/:id', verifyToken, deletarUsuarioPorId);
router.post('/check-email', checkEmailExists);
router.put('/update-password', updatePassword);

export default router;