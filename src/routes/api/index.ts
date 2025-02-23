import { Router } from 'express';
import userRoutes from './user-routes.js';
import thoughtRoutes from './thought-routes.js';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

export default router;
