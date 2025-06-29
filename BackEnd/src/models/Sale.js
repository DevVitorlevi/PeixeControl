
const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantitySold: {
        type: Number,
        required: true
    },
    pricePerKg: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentMethod: { 
        type: String,
        required: true,
        enum: ['Pix', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito']
    },
    saleDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Sale', SaleSchema);
