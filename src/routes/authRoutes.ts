import { Router } from "express";
import { AuthService } from "../services/AuthService.js";
import { RefreshTokenService } from "../services/RefreshTokenService.js";
import { LogoutService } from "../services/LogoutService.js";
import { AuthController } from "../controllers/AuthController.js";

const authRouter = Router();

const authService = new AuthService();
const refreshTokenService = new RefreshTokenService();
const logoutService = new LogoutService();

const authController = new AuthController(
    authService, 
    refreshTokenService, 
    logoutService
);

authRouter.post("/login", (req, res) => authController.login(req, res));
authRouter.post("/refresh", (req, res) => authController.refresh(req, res));
authRouter.post("/logout", (req, res) => authController.logout(req, res));

export default authRouter;