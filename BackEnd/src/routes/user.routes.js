const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth'); // Middleware que valida o token
const UserController = require('../controllers/UserController');

// Rota protegida para buscar dados do usuário logado
router.get('/me', auth, UserController.getProfile);

module.exports = router;
