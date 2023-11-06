
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const UserController = {
  renderUserForm: (req, res) => {
    res.render('user', { user: null });
  },

  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.redirect(`/users/${user.id}`);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  editUserForm: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'name', 'mobile', 'address', 'email', 'password'] // Include email and password attributes
      });
      res.render('edituser', { user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, mobile, address, email, password } = req.body;
      await User.update(
        { name, mobile, address, email, password },
        { where: { id: req.params.id } }
      );
      res.redirect(`/users/${req.params.id}`);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.destroy({ where: { id: req.params.id } });
      res.redirect('/users'); // Redirect to the user list or any other relevant page
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },

  displayUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'name', 'mobile', 'address', 'email', 'password'] 
      });
      res.render('displayuser', { user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  },

  displayAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'mobile', 'address', 'email', 'password'] 
      });
      res.render('allusers', { users });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  },

  signup: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email, password } });
      if (user) {
        res.redirect('/users/create');
      } else {
        res.render('signup');
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  },
  
  login: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email, password } });
      if (user) {
        req.user = user.id;
        console.log(req.user.id);
        res.redirect('/users');
      } else {
        res.render('login', { error: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  },
  

};

module.exports = UserController;
