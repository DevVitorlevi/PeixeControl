const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  planType: {
    type: String,
    enum: ['vitalicio', 'assinatura_mensal', 'assinatura_anual'],
    default: 'assinatura_mensal'
  },

  planStatus: {  
    type: String,
    enum: ['ativo', 'cancelado'], 
    default: 'ativo'
  },

  subscriptionValidUntil: { type: Date, default: null },

  previousValidUntil: { type: Date, default: null }, // ✅ Adicionado

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
