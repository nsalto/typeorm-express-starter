import { Router } from "express";
import authRoutes from "./v1/authRoutes";
import userRoutes from "./v1/userRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);

export default routes;
