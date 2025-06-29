// src/controllers/AuthController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async register(req, res) {
        const { name, email, password } = req.body;

        // Verificar se o email já está cadastrado
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email já cadastrado!' });
        }

        // Criptografar senha
        const hashedPassword = await bcrypt.hash(password, 8);

        // Criar usuário
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    },

    async login(req, res) {
        const { email, password } = req.body;

        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou senha inválidos!' });
        }

        // Comparar senhas
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Email ou senha inválidos!' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        return res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    }
};
