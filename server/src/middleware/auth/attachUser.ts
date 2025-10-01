import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Roles } from '../../types/roles.js';

interface TokenPayload {
    id: number;
    userName: string;
    role: Roles;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret'; // Always set in .env in real apps

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
            userName: decoded.userName,
            role: decoded.role,
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
