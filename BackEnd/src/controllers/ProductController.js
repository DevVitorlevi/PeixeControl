// src/controllers/ProductController.js
const Product = require('../models/Product');

module.exports = {
    async create(req, res) {
        const { name, pricePerKg, quantity } = req.body;

        if (!name || pricePerKg == null || quantity == null) {
            return res.status(400).json({ message: 'Nome, preço e quantidade são obrigatórios!' });
        }

        if (pricePerKg <= 0 || quantity < 0) {
            return res.status(400).json({ message: 'Preço deve ser maior que zero e quantidade não pode ser negativa!' });
        }

        const product = await Product.create({
            userId: req.userId,
            name,
            pricePerKg,
            quantity
        });

        return res.status(201).json(product);
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, pricePerKg, quantity } = req.body;

        if (!name || pricePerKg == null || quantity == null) {
            return res.status(400).json({ message: 'Nome, preço e quantidade são obrigatórios!' });
        }

        if (pricePerKg <= 0 || quantity < 0) {
            return res.status(400).json({ message: 'Preço deve ser maior que zero e quantidade não pode ser negativa!' });
        }

        const product = await Product.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { name, pricePerKg, quantity },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        return res.json(product);
    }
};
