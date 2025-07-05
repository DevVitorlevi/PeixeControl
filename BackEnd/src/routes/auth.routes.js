const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const adminAuth = require('../middlewares/adminAuth')

// Cadastro
router.post('/register', AuthController.register);

// Login
router.post('/login', AuthController.login);

router.post('/register-admin', auth, adminAuth, AuthController.registerAdmin);


module.exports = router;
