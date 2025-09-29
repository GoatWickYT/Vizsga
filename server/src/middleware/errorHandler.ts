import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (err instanceof Error) {
        res.status(500).json({ message: 'Server error', error: err.message });
    } else {
        res.status(500).json({ message: 'Server error', error: 'Unknown error' });
    }
}
