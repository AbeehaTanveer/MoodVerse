const Comment = require('../Model/commentModel');

// POST /api/comments

// POST /api/comments
const createComment = async (req, res) => {
   console.log("Incoming request body:", req.body); // Add this line
  try {
    const { author, text, mood, ayahReference } = req.body;
    

    // Enhanced validation
    if (!author || !text || !mood || !ayahReference) {
      return res.status(400).json({ 
        message: 'Author, comment text, mood, and ayah reference are required.' 
      });
    }

    // Create new comment with all required fields
    const newComment = new Comment({
      author,
      text,
      mood,
      ayahReference, // Make sure this is included
      likes: []
    });

    const savedComment = await newComment.save();

    res.status(201).json({
      message: 'Comment created successfully!',
      comment: savedComment
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server error while creating comment.' });
  }
};

// GET /api/comments
// GET /api/comments
const getComments = async (req, res) => {
  try {
    const { mood, ayahReference } = req.query;

    // Build filter object
    const filter = {};
    if (mood) filter.mood = mood;
    if (ayahReference) filter.ayahReference = ayahReference;

    const comments = await Comment.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Comments fetched successfully!',
      comments
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error while fetching comments.' });
  }
};

const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // ✅ Fix corrupted data if likes is not an array
    if (!Array.isArray(comment.likes)) {
      comment.likes = [];
    }

    const hasLiked = comment.likes.includes(userId);

    if (hasLiked) {
      // 👎 Remove like
      comment.likes = comment.likes.filter(id => id !== userId);
    } else {
      // 👍 Add like
      comment.likes.push(userId);
    }

    await comment.save();

    res.status(200).json({
      message: hasLiked ? 'Like removed' : 'Comment liked',
      likes: comment.likes.length,
      likedBy: comment.likes
    });
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createComment, likeComment,getComments
};
