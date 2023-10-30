import express from 'express';
import {
  createUser,
  getUser,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
} from 'controllers/user.controllers';

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get user by ID
router.get('/:id', getUser);

// Get user by email
router.get('/:email', getUserByEmail);

// Get all users
router.get('/', getUsers);

// Update user by ID
router.put('/:id', updateUser);

// Delete user by ID
router.delete('/:id', deleteUser);

export default router;
