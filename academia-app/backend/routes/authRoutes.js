// backend/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/authController');
const router = express.Router();

// Rota para registro
router.post('/register', registerUser);

// Rota para login
router.post('/login', loginUser);

router.get('/users', getAllUsers);

module.exports = router;