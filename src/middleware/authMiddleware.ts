import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JwtConfig } from "../config/jwt.config.js";
import { AppError } from "../errors/AppError.js";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError(401, "Token não fornecido");
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
        throw new AppError(401, "Token malformado");
    }

    let payload: JwtPayload;

    try {
        payload = jwt.verify(
            token,
            JwtConfig.access.secret // Usa a chave secreta do Access Token
        ) as JwtPayload;
    } catch {
        throw new AppError(401, "Token inválido ou expirado");
    }

    if (payload.type !== "access") {
        throw new AppError(401, "Token inválido");
    }

    req.user = {
        id: payload.sub as string,
        email: payload.email as string,
    };

    next();
}