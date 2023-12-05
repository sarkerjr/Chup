import express from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import profileRoutes from './profile.routes';
import messageRoutes from './message.routes';
import conversationRoutes from './conversation.routes';

import isAuthenticated from '@/middleware/auth.middleware';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', isAuthenticated, userRoutes);
router.use('/profile', isAuthenticated, profileRoutes);
router.use('/message', isAuthenticated, messageRoutes);
router.use('/conversation', isAuthenticated, conversationRoutes);

export default router;
