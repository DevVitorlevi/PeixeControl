const StockMovement = require('../models/StockMovement');

module.exports = {
  async list(req, res) {
    try {
      const { date } = req.query;
      const userId = req.userId;

      let filter = { userId };

      if (date) {
        // Considerar o dia inteiro: de 00:00:00 a 23:59:59
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        filter.date = { $gte: start, $lte: end };
      }

      const movements = await StockMovement.find(filter).sort({ date: -1 });
      return res.json(movements);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar movimentações de estoque' });
    }
  }
};
