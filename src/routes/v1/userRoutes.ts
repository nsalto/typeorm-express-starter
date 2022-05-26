import { Router } from 'express';
//import { UserController } from '../../controllers/UserController'

const userRoutes = Router();

userRoutes.post('/signin');
userRoutes.post('/refresh/token');
userRoutes.delete('/signout');

export default userRoutes