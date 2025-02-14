import express from 'express';
import { criarPedido, listarPedidos, listarPedidosPorUsuario, verPedidoPorId, atualizarPedidoPorId, deletarPedidoPorId } from '../controllers/pedido.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';



const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - nome
 *         - quantity
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do item
 *         quantity:
 *           type: number
 *           description: Quantidade do item
 *         toppings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do topping
 *     Pedido:
 *       type: object
 *       required:
 *         - preco
 *         - usuario
 *         - items
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do pedido
 *         preco:
 *           type: number
 *           description: Preço do pedido
 *         pago:
 *           type: boolean
 *           description: Status de pagamento do pedido
 *         usuario:
 *           type: string
 *           description: ID do usuário que fez o pedido
 *         status:
 *           type: string
 *           description: Status do pedido
 *         date:
 *           type: string
 *           format: date-time
 *           description: Data do pedido
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Campos obrigatórios não fornecidos
 */
router.post('/', verifyToken, criarPedido);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Retorna a lista de todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */
router.get('/', listarPedidos);

/**
 * @swagger
 * /pedidos/usuario/{usuarioId}:
 *   get:
 *     summary: Retorna a lista de pedidos por usuário
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de pedidos por usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */
router.get('/usuario/:usuarioId', listarPedidosPorUsuario);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Retorna um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/:id', verPedidoPorId);

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       404:
 *         description: Pedido não encontrado
 */
router.put('/:id', atualizarPedidoPorId);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Deleta um pedido pelo ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
router.delete('/:id', deletarPedidoPorId);

export default router;