const express = require("express");
const router = express.Router();

const SaleController = require("../controllers/SaleController");
const auth = require("../middlewares/auth");

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Registro e listagem de vendas
 */

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Registra uma nova venda (dá baixa no estoque automaticamente)
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaleInput'
 *     responses:
 *       201:
 *         description: Venda registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       400:
 *         description: Itens/forma de pagamento inválidos ou estoque insuficiente
 *       404:
 *         description: Algum produto do carrinho não foi encontrado
 */
router.post("/", SaleController.create);

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Lista todas as vendas do usuário logado
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendas (mais recentes primeiro)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 */
router.get("/", SaleController.list);

module.exports = router;
