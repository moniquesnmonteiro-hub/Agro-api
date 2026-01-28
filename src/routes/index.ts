import { Router } from "express";

import pesquisadorRouter from "./pesquisadorRoutes.js";
import sensorRouter from "./sensorRoutes.js";

const routes = Router();

// pesquisadores
routes.use(pesquisadorRouter);

// sensores
routes.use(sensorRouter);

export default routes;