const Comment = require('../Model/commentModel');

// POST /api/comments
const createComment = async (req, res) => {
  try {
    const { author, text, mood } = req.body;

    // ✅ Simple validation
    if (!author || !text || !mood) {
      return res.status(400).json({ message: 'Author, comment text, and mood are required.' });
    }

    // ✅ Create new comment
    const newComment = new Comment({
      author,
      text,
      mood
    });

    // ✅ Save to DB
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


const getComments = async (req, res) => {
  try {
    const { mood } = req.query;

    let filter = {};
    if (mood) {
      filter.mood = mood;
    }

    const comments = await Comment.find(filter).sort({ createdAt: -1 }); // newest first

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
