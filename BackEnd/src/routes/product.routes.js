const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const auth = require("../middlewares/auth");

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos (peixes) em estoque
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Dados inválidos (nome, preço ou quantidade ausentes/incorretos)
 */
router.post("/", ProductController.create);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos do usuário logado
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", ProductController.list);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Atualiza um produto existente
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Produto não encontrado
 */
router.patch("/:id", ProductController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto (registra saída de estoque antes de deletar)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", ProductController.delete);

/**
 * @swagger
 * /products/low-stock-alert:
 *   get:
 *     summary: Lista produtos com estoque baixo (quantidade <= 5kg)
 *     tags: [Products]
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
 *       500:
 *         description: Erro ao buscar alerta de estoque baixo
 */
router.get("/low-stock-alert", ProductController.lowStockAlert);

module.exports = router;
