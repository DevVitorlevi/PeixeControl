// src/routes/product.routes.js
const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');

// Todas as rotas protegidas
router.use(auth);

// Criar produto
router.post('/', ProductController.create);

// Listar produtos
router.get('/', ProductController.list);

// Atualizar produto
router.put('/:id', ProductController.update);

// Deletar produto
router.delete('/:id', ProductController.delete);

module.exports = router;
