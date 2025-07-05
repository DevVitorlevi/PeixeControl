// middlewares/subscriptionCheck.js
const User = require('../models/User');

module.exports = async function (req, res, next) {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Liberar vitalício
        if (user.planType === 'vitalicio') {
            return next();
        }

        // Bloquear assinatura expirada
        if (user.subscriptionValidUntil && new Date() > user.subscriptionValidUntil) {
            return res.status(403).json({ message: 'Assinatura expirada! Por favor, renove sua assinatura.' });
        }

        return next();
    } catch (err) {
        return res.status(500).json({ message: 'Erro na verificação da assinatura' });
    }
};
