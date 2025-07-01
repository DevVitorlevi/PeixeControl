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

    async list(req, res) {
        const products = await Product.find({ userId: req.userId }).sort({ name: 1 });
        return res.json(products);
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
    },

    async delete(req, res) {
        const { id } = req.params;

        const product = await Product.findOneAndDelete({ _id: id, userId: req.userId });

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        return res.json({ message: 'Produto deletado com sucesso!' });
    },

    async lowStockAlert(req, res) {
        try {
            const lowStock = await Product.find({ userId: req.userId, quantity: { $lte: 5 } });
            return res.json(lowStock);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar alerta de estoque baixo' });
        }
    }
};
