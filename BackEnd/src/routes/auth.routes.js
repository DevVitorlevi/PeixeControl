const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Rota para registrar admin
router.post('/register-admin', AuthController.registerAdmin);

module.exports = router;
