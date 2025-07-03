const express = require('express');
const router = express.Router();
const StockMovementController = require('../controllers/StockMovementController');
const auth = require('../middlewares/auth');

router.use(auth);

// Listar movimentações
router.get('/', StockMovementController.list);

module.exports = router;
