import express from 'express';

import profileRoutes from './profile.routes';

const router = express.Router();

router.use('/profile', profileRoutes);

export default router;
