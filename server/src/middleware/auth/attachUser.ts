import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Roles } from '../../types/roles.js';
import { config } from '../../config/env.js';

interface TokenPayload {
    id: number;
    username: string;
    role: Roles;
}

const JWT_SECRET = config.jwtSecret;

export const attachUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or malformed Authorization header' });
    }

    const token: string = authHeader.split(' ')[1];

    try {
        const decoded: TokenPayload = jwt.verify(token, JWT_SECRET) as TokenPayload;
        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
        };

        next();
    } catch {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};
