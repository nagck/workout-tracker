const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Creating a new schema with required fields
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
    name: { type: String, trim: true, required: 'Enter the name of the exercise' },
    type: { type: String, trim: true, required: 'Enter type of exercise' },
    weight: { type: Number},
    sets: { type: Number},
    reps: { type: Number},
    duration: { type: Number, required: 'Enter the duration' },
    distance: { type: Number}
  }]
});

// Create collection/table name workout 
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;