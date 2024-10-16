// backend/routes/workoutRoutes.js
const express = require('express');

const {
  updateExerciseWeight,
  createWorkout,
  getWorkoutsByProfessor,
  getWorkoutById,
} = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para criar treino (somente professor)
router.post('/', protect, createWorkout);

// Rota para listar treinos do professor logado
router.get('/', protect, getWorkoutsByProfessor);

// Rota para visualizar treino por ID (aluno ou professor)
router.get('/:id', protect, getWorkoutById);

router.put('/update-weight', updateExerciseWeight);

module.exports = router;
