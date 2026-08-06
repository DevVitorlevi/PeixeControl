const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const UserController = require("../controllers/UserController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Perfil e listagem de usuários
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário logado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/me", auth, UserController.getProfile);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários cadastrados
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários (sem o campo password)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao buscar usuários
 */
router.get("/", UserController.listUsers);

module.exports = router;
