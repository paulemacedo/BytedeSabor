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

/**
 * @swagger
 * components:
 *   schemas:
 *     Acompanhamento:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do acompanhamento
 *         nome:
 *           type: string
 *           description: Nome do acompanhamento
 *         imagem:
 *           type: string
 *           description: URL da imagem do acompanhamento
 *         descricao:
 *           type: string
 *           description: Descrição do acompanhamento
 *         preco:
 *           type: number
 *           description: Preço do acompanhamento
 *         emEstoque:
 *           type: boolean
 *           description: Disponibilidade do acompanhamento
 */

/**
 * @swagger
 * /acompanhamentos:
 *   get:
 *     summary: Retorna a lista de todos os acompanhamentos
 *     tags: [Acompanhamentos]
 *     responses:
 *       200:
 *         description: Lista de acompanhamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Acompanhamento'
 */
router.get('/', listarAcompanhamentos);

/**
 * @swagger
 * /acompanhamentos:
 *   post:
 *     summary: Cria um novo acompanhamento
 *     tags: [Acompanhamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Acompanhamento'
 *     responses:
 *       201:
 *         description: Acompanhamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Acompanhamento'
 *       400:
 *         description: Faltando dados obrigatórios
 */
router.post('/', criarAcompanhamento);

/**
 * @swagger
 * /acompanhamentos/{id}:
 *   get:
 *     summary: Retorna um acompanhamento pelo ID
 *     tags: [Acompanhamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do acompanhamento
 *     responses:
 *       200:
 *         description: Acompanhamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Acompanhamento'
 *       404:
 *         description: Acompanhamento não encontrado
 */
router.get('/:id', verAcompanhamentoPorId);

/**
 * @swagger
 * /acompanhamentos/{id}:
 *   put:
 *     summary: Atualiza um acompanhamento pelo ID
 *     tags: [Acompanhamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do acompanhamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Acompanhamento'
 *     responses:
 *       200:
 *         description: Acompanhamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Acompanhamento'
 *       404:
 *         description: Acompanhamento não encontrado
 */
router.put('/:id', atualizarAcompanhamentoPorId);

/**
 * @swagger
 * /acompanhamentos/{id}:
 *   delete:
 *     summary: Deleta um acompanhamento pelo ID
 *     tags: [Acompanhamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do acompanhamento
 *     responses:
 *       200:
 *         description: Acompanhamento deletado com sucesso
 *       404:
 *         description: Acompanhamento não encontrado
 */
router.delete('/:id', deletarAcompanhamentoPorId);

export default router;