import { Router } from 'express';
import { signIn } from '../../controllers/UserController';
import { validateSignIn } from './user.validator';

const router = Router();

router.post('/signin', validateSignIn, signIn);

export default router;
