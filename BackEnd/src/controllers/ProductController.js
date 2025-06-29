// src/controllers/ProductController.js
const Product = require('../models/Product');

module.exports = {
    async create(req, res) {
        const { name, pricePerKg, quantity } = req.body;

        const product = await Product.create({
            userId: req.userId,
            name,
            pricePerKg,
            quantity
        });

        return res.status(201).json(product);
    },

    async list(req, res) {
        const products = await Product.find({ userId: req.userId });
        return res.json(products);
    },

    async update(req, res) {
        const { id } = req.params;
        const { name, pricePerKg, quantity } = req.body;

        const product = await Product.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { name, pricePerKg, quantity },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        return res.json(product);
    },

    async delete(req, res) {
        const { id } = req.params;

        const product = await Product.findOneAndDelete({ _id: id, userId: req.userId });

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        return res.json({ message: 'Produto removido com sucesso!' });
    }
};
