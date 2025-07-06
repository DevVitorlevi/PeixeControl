const User = require('../models/User');

module.exports = async function (req, res, next) {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Se o usuário estiver cancelado, bloqueia o acesso
        if (user.planType === 'cancelado') {
            return res.status(403).json({ message: 'Acesso cancelado. Entre em contato com o administrador.' });
        }

        // Verifica validade para assinaturas mensais ou anuais
        if ((user.planType === 'assinatura_mensal' || user.planType === 'assinatura_anual') &&
            user.subscriptionValidUntil && new Date() > user.subscriptionValidUntil) {
            return res.status(403).json({ message: 'Assinatura expirada!' });
        }

        return next();
    } catch (err) {
        return res.status(500).json({ message: 'Erro na verificação da assinatura' });
    }
};
