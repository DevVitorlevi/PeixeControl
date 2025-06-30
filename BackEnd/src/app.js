require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const saleRoutes = require('./routes/sale.routes')
const userRoutes = require('./routes/user.routes');
const reportRoutes = require('./routes/report.routes');




app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes)
app.use('/users', userRoutes);
app.use('/reports', reportRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB Atlas Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error: ', err));
module.exports = app;
