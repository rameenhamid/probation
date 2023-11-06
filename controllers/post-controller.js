const { Post } = require('../models');

const PostController = {
  renderPostForm: (req, res) => {
    const userId = req.params.userId;
    res.render('createPost', { userId: userId });
  },

  createPost: async (req, res) => {
    try {
      const { title, content, userId } = req.body;
      const post = await Post.create({ title, content, userId });
      res.redirect(`/users/${userId}/posts/${post.id}`);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  },

  displayAllPosts: async (req, res) => {
    try {
      const userId = req.params.userId;
      const posts = await Post.findAll({ where: { userId: userId } });
      res.render('allPosts', { userId: userId, posts: posts });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  },

  displayPost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findByPk(postId);
      res.render('displayPost', { post });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve post' });
    }
  },

  renderEditPostForm: async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findByPk(postId);
      res.render('editPost', { post });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve post' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const postId = req.params.postId;
      await Post.update({ title, content }, { where: { id: postId } });
      res.redirect(`/users/${req.params.userId}/posts/${postId}`);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update post' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const postId = req.params.postId;
      await Post.destroy({ where: { id: postId } });
      res.redirect(`/users/${req.params.userId}/posts`);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }
};

module.exports = PostController;
