const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const ReportController = require('../controllers/ReportController');

router.use(auth);

router.get('/sales-summary', ReportController.salesSummary)
router.get('/low-stock', ReportController.lowStock);
router.get('/profit-summary', ReportController.profitSummary);
router.get('/stock-alert', ReportController.stockAlert);
router.get('/sales-history', ReportController.salesHistory);
router.get('/monthly-summary', ReportController.monthlySummary);

module.exports = router;
