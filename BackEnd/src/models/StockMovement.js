const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     StockMovement:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *         productId:
 *           type: string
 *         productName:
 *           type: string
 *           example: Tilápia
 *         type:
 *           type: string
 *           enum: [Entrada, Saída]
 *         quantity:
 *           type: number
 *           example: 5
 *         date:
 *           type: string
 *           format: date-time
 */

const StockMovementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Entrada", "Saída"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StockMovement", StockMovementSchema);
