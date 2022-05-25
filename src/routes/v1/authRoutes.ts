import { Router } from 'express';
import { signIn, refreshToken, signOut } from '../../controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/signin', signIn);
authRoutes.post('/refresh/token', refreshToken);
authRoutes.delete('/signout', signOut);

export default authRoutes;