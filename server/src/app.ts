import express, { Request, Response, NextFunction } from 'express';
// import the routes from ./routes/*.js, always ends in '.js'
// import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
// app.use('/users', userRoutes);
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
});
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(500).json({ message: 'Server error', error: err.message });
    } else {
        res.status(500).json({ message: 'Server error', error: 'Unknown error' });
    }
});

export default app;
