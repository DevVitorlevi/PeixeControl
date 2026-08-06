require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../config/swagger");

const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const saleRoutes = require("./sale.routes");
const userRoutes = require("./user.routes");
const reportRoutes = require("./report.routes");
const stockRoutes = require("./stock.routes");

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/sales", saleRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);
app.use("/stock-history", stockRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error: ", err));
module.exports = app;
