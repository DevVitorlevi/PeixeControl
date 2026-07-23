const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password, planType, role } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios!" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "A senha deve ter no mínimo 6 caracteres!" });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email já cadastrado!" });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      });

      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso!", userId: user._id });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor ao cadastrar usuário." });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios!" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email ou senha inválidos!" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Email ou senha inválidos!" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      return res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro no servidor ao realizar login." });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  },

  async listUsers(req, res) {
    try {
      const users = await User.find().select("-password");
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  },
};
