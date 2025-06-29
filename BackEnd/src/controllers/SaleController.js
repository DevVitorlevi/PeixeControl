// src/controllers/SaleController.js
const Sale = require('../models/Sale');
const Product = require('../models/Product');

module.exports = {
    async create(req, res) {
        const { productId, quantitySold } = req.body;

        if (!productId || quantitySold == null) {
            return res.status(400).json({ message: 'Produto e quantidade vendida são obrigatórios!' });
        }

        if (quantitySold <= 0) {
            return res.status(400).json({ message: 'A quantidade vendida deve ser maior que zero!' });
        }

        const product = await Product.findOne({ _id: productId, userId: req.userId });

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        if (product.quantity < quantitySold) {
            return res.status(400).json({ message: 'Estoque insuficiente!' });
        }

        const total = product.pricePerKg * quantitySold;

        const sale = await Sale.create({
            userId: req.userId,
            productId,
            productName: product.name,
            quantitySold,
            pricePerKg: product.pricePerKg,
            total
        });

        product.quantity -= quantitySold;
        await product.save();

        return res.status(201).json(sale);
    }
};
