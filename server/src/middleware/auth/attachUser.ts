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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or malformed Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
        };

        next();
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
