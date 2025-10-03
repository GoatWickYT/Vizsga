import { Request, Response, NextFunction } from 'express';
import { Roles } from '../../types/roles.js';

export const authorizeRoles = (...allowedRoles: Roles[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user: { id: number; role: Roles; username: string } | undefined = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        if (allowedRoles.includes(user.role)) {
            return next();
        }

        return res.status(401).json({ error: 'Not authenticated' });
    };
};
