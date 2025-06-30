const Sale = require('../models/Sale');
const Product = require('../models/Product');

module.exports = {
    async salesSummary(req, res) {
        const { period } = req.query;

        let startDate = null;

        if (period === 'day') {
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
        } else if (period === 'week') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
        } else if (period === 'month') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
        }

        try {
            const filter = { userId: req.userId };
            if (startDate) {
                filter.saleDate = { $gte: startDate };
            }

            const sales = await Sale.find(filter);

            const totalSalesValue = sales.reduce((sum, sale) => sum + sale.total, 0);
            const totalQuantity = sales.reduce((sum, sale) => {
                return sum + sale.items.reduce((itemSum, item) => itemSum + item.quantitySold, 0);
            }, 0);

            return res.json({ totalSalesValue, totalQuantity });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar resumo de vendas' });
        }
    },

    async topProducts(req, res) {
        try {
            const topProducts = await Sale.aggregate([
                { $match: { userId: req.userId } },
                { $unwind: '$items' },
                { $group: { 
                    _id: '$items.productId',
                    productName: { $first: '$items.productName' },
                    totalQuantity: { $sum: '$items.quantitySold' },
                    totalSalesValue: { $sum: { $multiply: ['$items.pricePerKg', '$items.quantitySold'] } }
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
    },

    async profitSummary(req, res) { // ✅ NOVO
        try {
            const sales = await Sale.find({ userId: req.userId });

            let totalProfit = 0;

            sales.forEach(sale => {
                sale.items.forEach(item => {
                    const profitPerItem = (item.pricePerKg - item.costPerKg) * item.quantitySold;
                    totalProfit += profitPerItem;
                });
            });

            return res.json({ totalProfit });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao calcular lucro' });
        }
    },

    async stockAlert(req, res) { // ✅ NOVO
        try {
            const products = await Product.find({ userId: req.userId, quantity: { $lte: 5 } });

            if (products.length > 0) {
                return res.json({ alert: true, products });
            } else {
                return res.json({ alert: false, products: [] });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar alerta de estoque' });
        }
    },
     async salesHistory(req, res) {
        const { period } = req.query;

        let startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        if (period === 'week') {
            startDate.setDate(startDate.getDate() - 7);
        } else if (period === 'month') {
            startDate.setDate(startDate.getDate() - 30);
        } else if (period === 'all') {
            startDate = new Date(0); // desde o início
        }

        try {
            const sales = await Sale.find({
                userId: req.userId,
                saleDate: { $gte: startDate }
            }).sort({ saleDate: -1 });

            return res.json(sales);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar histórico de vendas' });
        }
    }
};
