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

  planStatus: {  // ✅ Novo campo para controle de status
    type: String,
    enum: ['ativo', 'cancelado'], // Plano pode estar ativo ou cancelado
    default: 'ativo'
  },

  subscriptionValidUntil: { type: Date, default: null },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
