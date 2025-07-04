const User = require('../models/User');

module.exports = async function (req, res, next) {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (user.planType === 'assinatura') {
            const today = new Date();
            if (!user.subscriptionValidUntil || user.subscriptionValidUntil < today) {
                return res.status(403).json({ message: 'Assinatura expirada. Acesse o administrador para renovar.' });
            }
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao verificar assinatura' });
    }
};
