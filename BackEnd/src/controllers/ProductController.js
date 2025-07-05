const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');

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

        // Registrar entrada no estoque
        await StockMovement.create({
            userId: req.userId,
            productId: product._id,
            productName: product.name,
            type: 'Entrada',
            quantity: quantity
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

        const product = await Product.findOne({ _id: id, userId: req.userId });

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        const quantityDifference = quantity - product.quantity;

        // Atualizar produto
        product.name = name;
        product.pricePerKg = pricePerKg;
        product.quantity = quantity;
        await product.save();

        // Registrar movimentação caso a quantidade tenha mudado
        if (quantityDifference !== 0) {
            await StockMovement.create({
                userId: req.userId,
                productId: product._id,
                productName: product.name,
                type: quantityDifference > 0 ? 'Entrada' : 'Saída',
                quantity: Math.abs(quantityDifference)
            });
        }

        return res.json(product);
    },

    async delete(req, res) {
        const { id } = req.params;

        const product = await Product.findOne({ _id: id, userId: req.userId });

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado!' });
        }

        // Registrar saída antes de deletar
        if (product.quantity > 0) {
            await StockMovement.create({
                userId: req.userId,
                productId: product._id,
                productName: product.name,
                type: 'Saída',
                quantity: product.quantity
            });
        }

        await product.deleteOne();

        return res.json({ message: 'Produto deletado com sucesso e saída registrada!' });
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
