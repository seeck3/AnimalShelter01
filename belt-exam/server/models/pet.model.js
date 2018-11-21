const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const PetSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter pet's name"],
    trim: true,
    minLength: [3, "Name must be more than 3 chracters"]
  },
  type: {
    type: String,
    trim: true,
    required: [true, "Enter pet's type"],
    minLength: [3, "Type must be more than 3 chracters"]
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Enter pet's description"],
    minLength: [3, "description must be more than 3 chracters"]
  },
  skill01: String,
  skill02: String,
  skill03: String,
  likes: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Pet', PetSchema);
