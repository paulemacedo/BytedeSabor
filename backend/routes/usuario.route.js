import express from 'express'
import {  } from '../controllers/usuario.controller.js'
import { criarUsuario, verUsuarioPorId, atualizarUsuarioPorId, deletarUsuarioPorId } from '../controllers/usuario.controller.js';

const router = express.Router();

router.post('/', criarUsuario);
router.get('/:id', verUsuarioPorId);
router.patch('/:id', atualizarUsuarioPorId);
router.delete('/:id', deletarUsuarioPorId);

export default router;