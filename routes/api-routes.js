const router = require('express').Router();
const Workout = require('../models/workout.js');

// Get all workout routes and add total duration
router.get('/api/workouts', (req, res) => {
  Workout.aggregate([{ $set: { totalDuration: { $sum: '$exercises.duration' } } }])
    .sort({ day: 1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Create workout
router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Add exercise to workout
router.put('/api/workouts/:id', ({ body, params }, res) => {
  Workout.findOneAndUpdate({ _id: params.id }, { $push: { exercises: body } }, { new: true })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// View total duration of each workout from past seven workouts
router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([{ $set: { totalDuration: { $sum: '$exercises.duration' } } }])
    .sort({ day: -1 })
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;