import { Router, Request, Response, NextFunction } from 'express';

const authRoutes = Router();

authRoutes.post('/signin');
authRoutes.post('/refresh/token');
authRoutes.delete('/signout');

export default authRoutes