const express = require('express');
const router = express.Router();
const StockMovementController = require('../controllers/StockMovimentController');
const auth = require('../middlewares/auth');

router.use(auth);

// Listar movimentações 
router.get('/', StockMovementController.list);

module.exports = router;
