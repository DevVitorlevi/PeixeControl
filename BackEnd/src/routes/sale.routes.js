// src/routes/sale.routes.js
const express = require('express');
const router = express.Router();

const SaleController = require('../controllers/SaleController');
const auth = require('../middlewares/auth');

// Todas as rotas protegidas
router.use(auth);

// Criar venda
router.post('/', SaleController.create);

// Listar vendas
router.get('/', SaleController.list);

module.exports = router;
