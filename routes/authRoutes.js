// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');

// Handle user login
router.post('/login', UserController.login);

// Handle user signup
router.post('/signup', UserController.signup);

module.exports = router;
