// controllers/reflectionsController.js
const Reflection = require('../Model/reflectionModel');

// @desc    Get all reflections
// @route   GET /api/reflections

exports.getReflections = async (req, res) => {
  try {
    // ✅ Checkpoint: ensure user is attached by verifyToken
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user found in request" });
    }

const reflections = await Reflection.find({ user: req.user.id })
  .sort({ date: -1 });

    res.status(200).json({ reflections });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reflections', error });
  }
};


// @desc    Create new reflection
// @route   POST /api/reflections
exports.createReflection = async (req, res) => {
  try {
    const { text, mood } = req.body;
    const userId = req.user.id; // if you're using auth middleware

    if (!text) {
      return res.status(400).json({ message: 'Reflection text is required' });
    }

    const newReflection = new Reflection({
      text,
      mood: mood || 'general',
      user: userId
    });

    await newReflection.save();
    res.status(201).json({ message: 'Reflection created', reflection: newReflection });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reflection', error });
  }
};
