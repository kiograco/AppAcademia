// backend/controllers/workoutController.js
const Workout = require('../models/Workout');

// Criar um novo treino
// Registrar um novo treino
// Registrar um novo treino com atividades ilimitadas
exports.createWorkout = async (req, res) => {
  const { title, activities } = req.body;

  try {
    // Criar um novo treino com as atividades associadas
    const workout = await Workout.create({
      title,
      activities: activities.map(activity => ({
        exerciseName: activity.exerciseName,
        sets: activity.sets,
        reps: activity.reps,
        weight: activity.weight, // Peso inicial informado pelo professor
        lastUsedWeight: activity.weight // Peso usado na última atividade, começa igual ao peso inicial
      })),
      createdBy: req.user._id, // O ID do professor que criou o treino
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar treino', error: error.message });
  }
};


// Listar treinos do professor
exports.getWorkoutsByProfessor = async (req, res) => {
  try {
    const workouts = await Workout.find({ createdBy: req.user._id });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar treinos' });
  }
};

// Visualizar treino por ID (para alunos e professores)
exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Treino não encontrado' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar treino' });
  }
};

// Atualizar o peso de um exercício específico
exports.updateExerciseWeight = async (req, res) => {
  const { workoutId, activityId, newWeight } = req.body;

  try {
    // Encontrar o treino e o exercício específico
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ message: 'Treino não encontrado' });
    }

    const activity = workout.activities.id(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }

    // Atualizar o peso usado na última atividade
    activity.lastUsedWeight = newWeight;

    // Salvar as mudanças no treino
    await workout.save();

    res.status(200).json({ message: 'Peso atualizado com sucesso', activity });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar peso', error: error.message });
  }
};
