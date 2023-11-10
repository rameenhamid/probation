const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post-controller');

// Render the form for creating a post
router.get('/users/:userId/posts/create', PostController.renderPostForm);

// Create a new post for a specific user
router.post('/users/:userId/posts/create', PostController.createPost);

// Display all posts by a specific user
router.get('/users/:userId/posts', PostController.displayAllPosts);

// Display a specific post by a user
router.get('/users/:userId/posts/:postId', PostController.displayPost);

// Render the form for editing a post by a specific user
router.get('/users/:userId/posts/:postId/edit', PostController.renderEditPostForm);

// Update a post by a specific user
router.post('/users/:userId/posts/:postId/update', PostController.updatePost);

// Delete a post by a specific user
router.post('/users/:userId/posts/:postId/delete', PostController.deletePost);

module.exports = router;
