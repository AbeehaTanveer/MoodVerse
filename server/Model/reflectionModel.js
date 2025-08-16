// models/Reflection.js
const mongoose = require('mongoose');

const reflectionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'neutral', 'angry', 'excited', 'general'],
    default: 'general'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reflection', reflectionSchema);
