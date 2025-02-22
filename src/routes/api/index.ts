import { Router } from 'express';
import userRoutes from './user-routes';
import thoughtRoutes from './thought-routes';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

export default router;
