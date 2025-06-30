const Sale = require('../models/Sale');
const Product = require('../models/Product');

module.exports = {
    async create(req, res) {
        const { items, paymentMethod } = req.body;

        if (!items || items.length === 0 || !paymentMethod) {
            return res.status(400).json({ message: 'Itens e forma de pagamento são obrigatórios!' });
        }

        const validPayments = ['Pix', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'];
        if (!validPayments.includes(paymentMethod)) {
            return res.status(400).json({ message: 'Forma de pagamento inválida!' });
        }

        let total = 0;

        for (let item of items) {
            const { productId, quantitySold } = item;

            if (!productId || quantitySold == null) {
                return res.status(400).json({ message: 'Produto e quantidade são obrigatórios para cada item!' });
            }

            if (quantitySold <= 0) {
                return res.status(400).json({ message: 'A quantidade vendida deve ser maior que zero!' });
            }

            const product = await Product.findOne({ _id: productId, userId: req.userId });

            if (!product) {
                return res.status(404).json({ message: `Produto com ID ${productId} não encontrado!` });
            }

            if (product.quantity < quantitySold) {
                return res.status(400).json({ message: `Estoque insuficiente para o produto ${product.name}!` });
            }

            // Atualizar estoque
            product.quantity -= quantitySold;
            await product.save();

            // Atualiza dados no item
            item.productName = product.name;
            item.pricePerKg = product.pricePerKg;
            item.costPerKg = product.costPerKg; // ✅ NOVO

            total += product.pricePerKg * quantitySold;
        }

        const sale = await Sale.create({
            userId: req.userId,
            items,
            total,
            paymentMethod
        });

        return res.status(201).json(sale);
    },

    async list(req, res) {
        const sales = await Sale.find({ userId: req.userId }).sort({ saleDate: -1 });
        return res.json(sales);
    }
};
