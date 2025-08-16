const mongoose = require('mongoose');

const emojiAvatars = ['🌸', '🌼', '💮', '🌷', '🌹', '🌺'];

const CommentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: () => {
      const randomIndex = Math.floor(Math.random() * emojiAvatars.length);
      return emojiAvatars[randomIndex];
    }
  },
  mood: {
    type: String,
    required: true,
    trim: true,
    enum: ['Happy', 'Aad', 'Angry', 'Depressed', 'Calm', 'Excited', 'Forgiveness', 'Grateful', 'Sad']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  liked: {
    type: Boolean,
    default: false
  },
  likes: {
    type: [String], // Must be an array of user IDs (strings)
    default: []
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
