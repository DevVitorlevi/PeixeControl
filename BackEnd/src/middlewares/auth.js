module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido!' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token recebido:', token); // log

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token válido:', decoded); // log
        req.userId = decoded.id;
        req.userRole = decoded.role;
        req.planType = decoded.planType;
        return next();
    } catch (err) {
        console.log('Erro de verificação do token:', err.message); // log
        return res.status(401).json({ message: 'Token inválido!' });
    }
};
