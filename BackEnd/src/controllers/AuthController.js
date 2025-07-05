const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async register(req, res) {
    const { name, email, password, role, planType } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres!' });
    }

    if (role && !['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Role inválido!' });
    }

    if (planType && !['vitalicio', 'assinatura_mensal', 'assinatura_anual'].includes(planType)) {
        return res.status(400).json({ message: 'Tipo de plano inválido!' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'Email já cadastrado!' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    let subscriptionValidUntil = null;

    if (planType === 'assinatura_mensal') {
        subscriptionValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 dias
    } else if (planType === 'assinatura_anual') {
        subscriptionValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 365 dias
    } else if (planType === 'vitalicio') {
        subscriptionValidUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias grátis para começar
    }

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
        planType: planType || 'assinatura_mensal',
        subscriptionValidUntil
    });

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
},

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios!' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou senha inválidos!' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Email ou senha inválidos!' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role, planType: user.planType },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                planType: user.planType,
                subscriptionValidUntil: user.subscriptionValidUntil
            },
            token
        });
    }
    ,
     async registerAdmin(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres!' });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Email já cadastrado!' });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'admin', // força admin aqui
        planType: 'vitalicio', // admins são vitalícios normalmente
        subscriptionValidUntil: null,
      });

      return res.status(201).json({ message: 'Administrador cadastrado com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro no servidor ao cadastrar administrador.' });
    }
  },
};
