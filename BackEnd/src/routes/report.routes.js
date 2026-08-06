const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const ReportController = require("../controllers/ReportController");

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Relatórios de vendas, lucro e estoque
 */

/**
 * @swagger
 * /reports/sales-summary:
 *   get:
 *     summary: Resumo de vendas (valor total e quantidade), opcionalmente filtrado por período
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Resumo de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSalesValue:
 *                   type: number
 *                 totalQuantity:
 *                   type: number
 */
router.get("/sales-summary", ReportController.salesSummary);

/**
 * @swagger
 * /reports/top-products:
 *   get:
 *     summary: Lista os 5 produtos mais vendidos, opcionalmente filtrado por um dia específico
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: "Filtra por um dia específico (formato YYYY-MM-DD). Se omitido, considera todas as vendas."
 *     responses:
 *       200:
 *         description: Top 5 produtos mais vendidos (por quantidade)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID do produto
 *                   productName:
 *                     type: string
 *                   totalQuantity:
 *                     type: number
 *                   totalSalesValue:
 *                     type: number
 *       500:
 *         description: Erro ao buscar produtos mais vendidos
 */
router.get("/top-products", ReportController.topProducts);

/**
 * @swagger
 * /reports/low-stock:
 *   get:
 *     summary: Lista produtos com estoque baixo (quantidade <= 5kg)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos com estoque baixo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/low-stock", ReportController.lowStock);

/**
 * @swagger
 * /reports/profit-summary:
 *   get:
 *     summary: Retorna o lucro total (preço de venda - custo) de todas as vendas
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lucro total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProfit:
 *                   type: number
 */
router.get("/profit-summary", ReportController.profitSummary);

/**
 * @swagger
 * /reports/stock-alert:
 *   get:
 *     summary: Indica se há produtos em alerta de estoque baixo
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status do alerta e lista de produtos afetados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alert:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get("/stock-alert", ReportController.stockAlert);

/**
 * @swagger
 * /reports/sales-history:
 *   get:
 *     summary: Lista as vendas de um dia específico
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: "Data no formato YYYY-MM-DD"
 *     responses:
 *       200:
 *         description: Vendas do dia (mais recentes primeiro)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *       400:
 *         description: Data é obrigatória
 */
router.get("/sales-history", ReportController.salesHistory);

/**
 * @swagger
 * /reports/monthly-summary:
 *   get:
 *     summary: Resumo mensal de vendas (valor total, quantidade e lista de vendas)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           example: 8
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2026
 *     responses:
 *       200:
 *         description: Resumo mensal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSalesValue:
 *                   type: number
 *                 totalQuantity:
 *                   type: number
 *                 sales:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sale'
 *       400:
 *         description: Mês e ano são obrigatórios
 */
router.get("/monthly-summary", ReportController.monthlySummary);

module.exports = router;
