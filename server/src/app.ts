import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import wc_unitRoutes from './routes/map/wc_unitRoutes.js';
import menuRoutes from './routes/map/menuRoutes.js';
import iconRoutes from './routes/map/iconRoutes.js';
import spotRoutes from './routes/map/spotRoutes.js';
import animalRoutes from './routes/map/animalRoutes.js';
import statusRoutes from './routes/map/statusRoutes.js';
import buffetRoutes from './routes/map/buffetRoutes.js';
import animalTypeRoutes from './routes/map/animalTypeRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/wc_unit', wc_unitRoutes);
app.use('/icon', iconRoutes);
app.use('/menu', menuRoutes);
app.use('/spot', spotRoutes);
app.use('/buffet', buffetRoutes);
app.use('/status', statusRoutes);
app.use('/animal', animalRoutes);
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
