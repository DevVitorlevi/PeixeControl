const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665f1b2c9a1b2c0012a3b456
 *         userId:
 *           type: string
 *           example: 665f1a9c9a1b2c0012a3b400
 *         name:
 *           type: string
 *           example: Tilápia
 *         pricePerKg:
 *           type: number
 *           example: 18.90
 *         quantity:
 *           type: number
 *           example: 12.5
 *         createdAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - name
 *         - pricePerKg
 *         - quantity
 *     ProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Tilápia
 *         pricePerKg:
 *           type: number
 *           example: 18.90
 *         quantity:
 *           type: number
 *           example: 12.5
 *       required:
 *         - name
 *         - pricePerKg
 *         - quantity
 */

const ProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pricePerKg: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
