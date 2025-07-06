const User = require('../models/User');

module.exports = async function (req, res, next) {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Bloquear usuários com assinatura mensal ou anual expirada
        if (
            (user.planType === 'assinatura_mensal' || user.planType === 'assinatura_anual') &&
            user.subscriptionValidUntil &&
            new Date() > user.subscriptionValidUntil
        ) {
            return res.status(403).json({ message: 'Assinatura expirada!' });
        }

        return next();
    } catch (err) {
        return res.status(500).json({ message: 'Erro na verificação da assinatura' });
    }
};
