const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     SaleItemInput:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           example: 665f1b2c9a1b2c0012a3b456
 *         quantitySold:
 *           type: number
 *           example: 2.5
 *       required:
 *         - productId
 *         - quantitySold
 *     SaleInput:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SaleItemInput'
 *         paymentMethod:
 *           type: string
 *           enum: [Pix, Dinheiro, Cartão de Crédito, Cartão de Débito]
 *           example: Pix
 *       required:
 *         - items
 *         - paymentMethod
 *     Sale:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               productName:
 *                 type: string
 *               quantitySold:
 *                 type: number
 *               pricePerKg:
 *                 type: number
 *         total:
 *           type: number
 *           example: 47.25
 *         paymentMethod:
 *           type: string
 *           enum: [Pix, Dinheiro, Cartão de Crédito, Cartão de Débito]
 *         saleDate:
 *           type: string
 *           format: date-time
 */

const SaleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      quantitySold: {
        type: Number,
        required: true,
      },
      pricePerKg: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Pix", "Dinheiro", "Cartão de Crédito", "Cartão de Débito"],
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sale", SaleSchema);
