const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const subscriptionCheck = require('../middlewares/subscriptionCheck');
const adminAuth = require('../middlewares/adminAuth');
const UserController = require('../controllers/UserController');

// Rota protegida para pegar perfil
router.get('/me', auth, subscriptionCheck, UserController.getProfile);
// routes.js
router.patch('/:id', auth, subscriptionCheck, UserController.updatePlan);
router.get('/', auth, subscriptionCheck, adminAuth, UserController.listUsers);
router.post('/renew-subscription', auth, subscriptionCheck, adminAuth, UserController.renewSubscription);

module.exports = router;
