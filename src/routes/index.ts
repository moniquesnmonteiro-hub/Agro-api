import { Router } from "express";

import pesquisadorRouter from "./pesquisadorRoutes.js";
import sensorRouter from "./sensorRoutes.js";
import authRouter from "./authRoutes.js";

const routes = Router();

// autenticação 
routes.use(authRouter)

// pesquisadores
routes.use(pesquisadorRouter);

// sensores
routes.use(sensorRouter);

export default routes;