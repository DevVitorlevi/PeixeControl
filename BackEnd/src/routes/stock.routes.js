const express = require("express");
const router = express.Router();
const StockMovementController = require("../controllers/StockMovimentController");
const auth = require("../middlewares/auth");

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Stock
 *   description: Histórico de movimentações de estoque (entradas e saídas)
 */

/**
 * @swagger
 * /stock-history:
 *   get:
 *     summary: Lista as movimentações de estoque, opcionalmente filtradas por data
 *     tags: [Stock]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: "Filtra movimentações de um dia específico (formato YYYY-MM-DD)"
 *     responses:
 *       200:
 *         description: Lista de movimentações (mais recentes primeiro)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockMovement'
 *       500:
 *         description: Erro ao listar movimentações
 */
router.get("/", StockMovementController.list);

module.exports = router;
