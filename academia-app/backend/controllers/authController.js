// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Função para gerar o token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Registrar um novo usuário (professor ou aluno)
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    // Criar um novo usuário
    const user = await User.create({ name, email, password, role });

    // Retornar uma mensagem de sucesso junto com os dados do usuário
    res.status(201).json({
      message: 'Registro realizado com sucesso',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    // Log do erro no console para diagnósticos
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};



// Login do usuário
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};
