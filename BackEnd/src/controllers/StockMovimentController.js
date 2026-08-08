const StockMovement = require("../models/StockMovement");

function parseDateLocal(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

module.exports = {
  async list(req, res) {
    try {
      const { date, startDate, endDate } = req.query;
      const userId = req.userId;

      let filter = { userId };

      if (startDate && endDate) {
        const start = parseDateLocal(startDate);
        start.setHours(0, 0, 0, 0);

        const end = parseDateLocal(endDate);
        end.setHours(23, 59, 59, 999);

        filter.date = { $gte: start, $lte: end };
      } else if (date) {
        const start = parseDateLocal(date);
        start.setHours(0, 0, 0, 0);

        const end = parseDateLocal(date);
        end.setHours(23, 59, 59, 999);

        filter.date = { $gte: start, $lte: end };
      }

      const movements = await StockMovement.find(filter).sort({ date: -1 });
      return res.json(movements);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao listar movimentações de estoque" });
    }
  },
};
