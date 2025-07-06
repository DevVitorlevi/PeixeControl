// middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // ajuste para o seu caminho correto

module.exports = async function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido!' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado!' });
        }

        if (user.planStatus === 'cancelado') { // Use exatamente o campo que você usa no banco
            return res.status(403).json({ message: 'Sua assinatura está cancelada!' });
        }

        req.userId = user._id;
        req.userRole = user.role;
        req.planType = user.planType;

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido!' });
    }
};
