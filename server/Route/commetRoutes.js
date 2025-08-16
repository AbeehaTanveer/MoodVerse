const express = require('express');
const commentRoutes = express.Router();
const { createComment, likeComment, getComments } = require('../Controller/commentController');

commentRoutes.post('/comments', createComment);
commentRoutes.get('/comments', getComments);
commentRoutes.post('/comments/like/:commentId', likeComment); // ✅ Route is defined correctly




module.exports = commentRoutes;
