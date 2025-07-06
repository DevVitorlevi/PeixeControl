const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const subscriptionCheck = require('../middlewares/subscriptionCheck');
const UserController = require('../controllers/UserController');

// Rota protegida para pegar perfil
router.get('/me', auth, subscriptionCheck, UserController.getProfile);
// routes.js
router.patch('/:id', auth, subscriptionCheck, UserController.updatePlan);
router.get('/', UserController.listUsers);
router.post('/renew-subscription', auth, subscriptionCheck, UserController.renewSubscription);
router.patch('/:id/cancel-access', auth, UserController.cancelAccess);
module.exports = router;
