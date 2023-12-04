import express from 'express';
import { loginUser, registerUser } from '@/controllers/auth.controllers';

const router = express.Router();

// Create a new user
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router;
