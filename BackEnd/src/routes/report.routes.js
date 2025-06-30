const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const ReportController = require('../controllers/ReportController');

router.use(auth);

router.get('/sales-summary', ReportController.salesSummary);
router.get('/top-products', ReportController.topProducts);
router.get('/low-stock', ReportController.lowStock);

module.exports = router;
