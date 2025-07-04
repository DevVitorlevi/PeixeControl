const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const subscriptionCheck = require('../middlewares/subscriptionCheck');
const UserController = require('../controllers/UserController');

// Rota pública para cadastro
router.post('/register', UserController.register);

// Rota pública para login
router.post('/login', UserController.login);

// Rota protegida para pegar perfil (precisa estar autenticado e com assinatura válida)
router.get('/me', auth, subscriptionCheck, UserController.getProfile);

// Rotas administrativas (exemplo: listar usuários, renovar assinatura)
router.get('/', auth, UserController.listUsers); // listar todos usuários (admin)
router.post('/renew-subscription', auth, UserController.renewSubscription); // renovar assinatura

module.exports = router;
