// controllers/reflectionsController.js
const Reflection = require('../Model/reflectionModel');

// @desc    Get all reflections of a specific user
// @route   GET /api/reflections?userId=123
exports.getReflections = async (req, res) => {
  try {
    const { userId } = req.query; // ✅ userId comes from query string

    if (!userId) {
      return res.status(400).json({ message: "UserId is required to fetch reflections" });
    }

    const reflections = await Reflection.find({ user: userId }).sort({ date: -1 });

    res.status(200).json({ reflections });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reflections', error });
  }
};

// @desc    Create new reflection
// @route   POST /api/reflections
exports.createReflection = async (req, res) => {
  try {
    const { text, mood, userId } = req.body;
    console.log("Request body:", req.body);

    if (!text) {
      return res.status(400).json({ message: 'Reflection text is required' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }

    const newReflection = new Reflection({
      text,
      mood: mood || 'general',
      user: userId, // ✅ use userId from body
    });

    await newReflection.save();
    res.status(201).json({ message: 'Reflection created', reflection: newReflection });
  } catch (error) {
    console.error("Reflection creation error:", error); // ✅ log in server
    res.status(500).json({ message: 'Failed to create reflection', error: error.message });
  }
};
