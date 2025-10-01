import { Request, Response } from 'express';

export const errorHandler = (err: unknown, req: Request, res: Response) => {
    if (err instanceof Error) {
        res.status(500).json({ message: 'Server error', error: err.message });
    } else {
        res.status(500).json({ message: 'Server error', error: 'Unknown error' });
    }
};
