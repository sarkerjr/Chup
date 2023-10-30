import express from 'express';

import userRoutes from './user.routes';
import profileRoutes from './profile.routes';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/profile', profileRoutes);

export default router;
