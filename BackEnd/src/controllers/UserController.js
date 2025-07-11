const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async register(req, res) {
    try {
        const { name, email, password, planType, role } = req.body;

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

        let subscriptionValidUntil = null;
        const now = new Date();
        const trialDays = 7;

        // Adicionar dias de teste
        let trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + trialDays);

        if (planType === 'assinatura_mensal') {
            subscriptionValidUntil = new Date(trialEndDate);
            subscriptionValidUntil.setMonth(subscriptionValidUntil.getMonth() + 1);
        } else if (planType === 'assinatura_anual') {
            subscriptionValidUntil = new Date(trialEndDate);
            subscriptionValidUntil.setFullYear(subscriptionValidUntil.getFullYear() + 1);
        } else if (planType === 'vitalicio') {
            subscriptionValidUntil = null;
        } else {
            return res.status(400).json({ message: 'Plano inválido!' });
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
            planType: planType || 'assinatura_mensal',
            planStatus: 'ativo',
            subscriptionValidUntil,
        });

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: user._id });
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor ao cadastrar usuário.' });
    }
}
,

  async login(req, res) {
    try {
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

      if (user.planStatus === 'cancelado') {
        return res.status(403).json({ message: 'Sua assinatura está cancelada. Acesso negado.' });
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
          planStatus: user.planStatus,
          subscriptionValidUntil: user.subscriptionValidUntil,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro no servidor ao realizar login.' });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  },

  async listUsers(req, res) {
    try {
      const users = await User.find().select('-password');
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  },

  async renewSubscription(req, res) {
    try {
      const { userId, newValidUntil } = req.body;
      if (!userId || !newValidUntil) {
        return res.status(400).json({ message: 'userId e newValidUntil são obrigatórios' });
      }

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

      user.subscriptionValidUntil = new Date(newValidUntil);
      user.planStatus = 'ativo'; // Reativa o plano
      await user.save();

      return res.json({ message: 'Assinatura atualizada com sucesso!' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar assinatura' });
    }
  },

  async updatePlan(req, res) {
    try {
      const { id } = req.params;
      const { planType, subscriptionValidUntil } = req.body;

      if (!['vitalicio', 'assinatura_mensal', 'assinatura_anual'].includes(planType)) {
        return res.status(400).json({ message: 'Plano inválido!' });
      }

      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

      user.planType = planType;
      user.planStatus = 'ativo'; // Ativa o plano novamente

      if (planType === 'assinatura_mensal' || planType === 'assinatura_anual') {
        if (!subscriptionValidUntil) {
          return res.status(400).json({ message: 'Data de validade é obrigatória para assinatura!' });
        }
        user.subscriptionValidUntil = new Date(subscriptionValidUntil);
      } else {
        user.subscriptionValidUntil = null;
      }

      await user.save();

      return res.json({ message: 'Plano atualizado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar plano' });
    }
  },

   async cancelAccess(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

      user.planStatus = 'cancelado';
      user.previousValidUntil = user.subscriptionValidUntil; // ✅ Salva a validade antiga
      user.subscriptionValidUntil = null;

      await user.save();

      return res.json({ message: 'Acesso do usuário cancelado com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao cancelar acesso do usuário' });
    }
  },

  async reactivateAccess(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

      user.planStatus = 'ativo';
      user.subscriptionValidUntil = user.previousValidUntil; // ✅ Restaura a validade antiga
      user.previousValidUntil = null; // ✅ Limpa o campo de backup

      await user.save();

      return res.json({ message: 'Acesso do usuário reativado com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao reativar acesso do usuário' });
    }
  }
};
