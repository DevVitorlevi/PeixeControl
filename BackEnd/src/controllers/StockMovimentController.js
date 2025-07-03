const StockMovement = require('../models/StockMovement');

module.exports = {
    async list(req, res) {
        try {
            const movements = await StockMovement.find({ userId: req.userId }).sort({ date: -1 });
            return res.json(movements);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar movimentações de estoque' });
        }
    }
};
