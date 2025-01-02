import { Router } from 'express';
import userRoutes from './user/user.routes';

const router = Router();

// Combine all route modules
router.use('/user', userRoutes);

export default router;
