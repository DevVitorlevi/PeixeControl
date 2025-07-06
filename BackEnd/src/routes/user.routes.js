const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const subscriptionCheck = require('../middlewares/subscriptionCheck');
const UserController = require('../controllers/UserController');

// Rota protegida para pegar perfil
router.get('/me', auth, subscriptionCheck, UserController.getProfile);
// routes.js
router.get('/', UserController.listUsers);
router.post('/renew-subscription', UserController.renewSubscription);
router.patch('/:id/cancel-access', UserController.cancelAccess);
router.patch('/:id', UserController.updatePlan);

module.exports = router;
