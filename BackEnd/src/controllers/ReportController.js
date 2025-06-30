const Sale = require('../models/Sale');
const Product = require('../models/Product');

module.exports = {
    async salesSummary(req, res) {
        const { period } = req.query;

        let startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        if (period === 'week') {
            startDate.setDate(startDate.getDate() - 7);
        } else if (period === 'month') {
            startDate.setDate(startDate.getDate() - 30);
        }

        try {
            const sales = await Sale.find({
                userId: req.userId,
                saleDate: { $gte: startDate }
            });

            const totalSalesValue = sales.reduce((sum, sale) => sum + sale.total, 0);
            const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantitySold, 0);

            return res.json({ totalSalesValue, totalQuantity });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar resumo de vendas' });
        }
    },

    async topProducts(req, res) {
        try {
            const topProducts = await Sale.aggregate([
                { $match: { userId: req.userId } },
                { $group: { 
                    _id: '$productId',
                    productName: { $first: '$productName' },
                    totalQuantity: { $sum: '$quantitySold' },
                    totalSalesValue: { $sum: '$total' }
                }},
                { $sort: { totalQuantity: -1 } },
                { $limit: 5 }
            ]);

            return res.json(topProducts);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar produtos mais vendidos' });
        }
    },

    async lowStock(req, res) {
        try {
            const products = await Product.find({ userId: req.userId, quantity: { $lte: 5 } });
            return res.json(products);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar produtos com estoque baixo' });
        }
    }
};
