import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import WCRoutes from './routes/map/wcRoutes.js';
import menuRoutes from './routes/map/menuRoutes.js';
import iconRoutes from './routes/map/iconRoutes.js';
import statusRoutes from './routes/map/statusRoutes.js';
import animalTypeRoutes from './routes/map/animalTypeRoutes.js';

// import the routes from ./routes/*.js, always ends in '.js'
// import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());
// app.use('/users', userRoutes);

app.use('/wc', WCRoutes);
app.use('/icon', iconRoutes);
app.use('/menu', menuRoutes);
app.use('/status', statusRoutes);
app.use('/animalType', animalTypeRoutes);

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
