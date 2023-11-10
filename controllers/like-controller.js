const { Like, Post } = require('../models');

const LikeController = {
  renderLikeForm: (req, res) => {
    const userId = req.params.userId;
    res.render('allPostsLikes', { userId: userId });
  },

  createLike: async (req, res) => {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;
      let reactionType = req.body.reactionType;
      if (!reactionType) {
        reactionType = "Not Liked";
      }
      const existingLike = await Like.findOne({ where: { postId } });
      if (existingLike) {
        return res.status(400).json({ error: 'A reaction for this post already exists' });
      }
      const like = await Like.create({ postId, userId, reaction: reactionType });
      const fetchedLike = await Like.findByPk(like.id);
      const posts = await Post.findAll(); 
      res.render('displayLike', { like: fetchedLike, posts: posts });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create like' });
    }
  },

  displayAllLikes: async (req, res) => {
    try {
      const likes = await Like.findAll();
      const posts = await Post.findAll();

      // Preprocess the data to match likes with posts
      const processedLikes = likes.map(like => {
        const correspondingPost = posts.find(post => post.id === like.postId);
        return {
          postId: like.postId,
          userId: correspondingPost.userId,
          title: correspondingPost.title,
          reaction: like.reaction
        };
      });

      res.render('allPostsLikes', { likes: processedLikes, posts: posts });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve likes' });
    }
  },  

  displayLike: async (req, res) => {
      try {
        const likeId = req.params.likeId;
        const like = await Like.findByPk(likeId);
        res.json(like);
      } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve like' });
      }
    },

  renderEditLikeForm: async (req, res) => {
      try {
        const likeId = req.params.likeId;
        const like = await Like.findByPk(likeId);
        res.render('editLike', { like });
      } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve like' });
      }
    },

  updateLike: async (req, res) => {
      try {
        const { reactionType } = req.body;
        const likeId = req.params.likeId;
        const userId = req.params.userId;
        const postId = req.params.postId;
        if (!reactionType) {
          reactionType = "Not Liked";
        }
        await Like.update({ reaction: reactionType }, { where: { id: likeId } });
        const fetchedLike = await Like.findByPk(likeId);
        res.render('displayLike', { like: fetchedLike });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update like' });
      }
    },

  deleteLike: async (req, res) => {
    try {
      const likeId = req.params.likeId;
      await Like.destroy({ where: { id: likeId } });
      const posts = await Post.findAll({ where: { userId: req.params.userId } }); 
      const like = await Like.findAll({ where: { userId: req.params.userId } });
      const userId = req.params.userId; // Make sure userId is defined

      // Pass the likes along with the posts and userId
      res.render('allPosts', { posts, userId});
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete like' });
  }
}

};

module.exports = LikeController;
