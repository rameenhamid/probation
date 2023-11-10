const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/like-controller');

// Render the form for creating a like
router.get('/users/:userId/posts/:postId/like/createLike', LikeController.renderLikeForm);

// Create a like for a specific post by a specific user
router.post('/users/:userId/posts/:postId/like/createLike', LikeController.createLike);

// Display all likes for a specific post
router.get('/users/:userId/posts/:postId/like', LikeController.displayAllLikes);

// Display a specific like for a post by a user
router.get('/users/:userId/posts/:postId/like/:likeId', LikeController.displayLike);

router.post('/users/:userId/posts/:postId/like/:likeId/edit', LikeController.renderEditLikeForm);

router.post('/users/:userId/posts/:postId/like/:likeId/update', LikeController.updateLike);

// Delete a like for a specific post by a specific user
router.post('/users/:userId/posts/:postId/like/:likeId/undo', LikeController.deleteLike);

module.exports = router;
