import { Request, Response, NextFunction } from 'express';
import { RequestWithId } from '../types/express.js';

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'Invalid ID parameter' });
    }
    (req as RequestWithId).validId = id;
    next();
};
