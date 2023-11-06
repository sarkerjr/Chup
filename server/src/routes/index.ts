import express from 'express';

import userRoutes from './user.routes';
import profileRoutes from './profile.routes';
import messageRoutes from './message.routes';
import conversationRoutes from './conversation.routes';
import memberRoutes from './member.routes';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/message', messageRoutes);
router.use('/conversation', conversationRoutes);
router.use('/member', memberRoutes);

export default router;
