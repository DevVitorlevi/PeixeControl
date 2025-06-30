const User = require('../models/User');

module.exports = {
    async getProfile(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password'); // Não retornar a senha

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            return res.json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
    }
};
