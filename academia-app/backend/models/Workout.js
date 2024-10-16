const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  exerciseName: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true }, // Peso inicial
  lastUsedWeight: { type: Number, required: true }, // Peso da última atividade
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  activities: [activitySchema], // Array de atividades
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referência ao professor que criou o treino
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;

