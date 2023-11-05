const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');

router.get('/', UserController.displayAllUsers);

// Render the form for creating a user
router.get('/create', UserController.renderUserForm);

// Create a new user
router.post('/create', UserController.createUser);

// Render the form for editing a user
router.get('/:id/edit', UserController.editUserForm);

// Update a user
router.post('/:id/update', UserController.updateUser);

// Display a user
router.get('/:id', UserController.displayUser);

// Delete a user
router.post('/:id/delete', UserController.deleteUser);

module.exports = router;
