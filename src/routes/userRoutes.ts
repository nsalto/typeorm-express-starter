import { Router, Request, Response, NextFunction } from 'express';

const userRoutes = Router();

userRoutes.post('/signin');
userRoutes.post('/refresh/token');
userRoutes.delete('/signout');

export default userRoutes