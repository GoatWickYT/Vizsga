import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import express, { Request, Response } from 'express';

// --- Swagger ---
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerSpec.js';

// --- Routes ---
import menuRoutes from './routes/map/menuRoutes.js';
import spotRoutes from './routes/map/spotRoutes.js';
import wcUnitRoutes from './routes/map/wcUnitRoutes.js';
import animalRoutes from './routes/map/animalRoutes.js';
import buffetRoutes from './routes/map/buffetRoutes.js';
import authRoutes from './routes/auth.js';

import postRoutes from './routes/news/postRoutes.js';
import commentRoutes from './routes/news/commentRoutes.js';

import personRoutes from './routes/ticket/personRoutes.js';
import ticketRoutes from './routes/ticket/ticketRoutes.js';
import ticketTypeRoutes from './routes/ticket/ticketTypeRoutes.js';

import updateRoutes from './routes/updateCountsRoutes.js';

// --- Middleware ---
import errorHandler from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

import basicAuth from 'express-basic-auth';

const swaggerCss = fs.readFileSync(join(process.cwd(), 'swagger', 'swaggerTheme.css'), 'utf8');

const app = express();

// --- Global middleware ---
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// --- Swagger docs ---
app.use(
    '/api-docs',
    basicAuth({
        users: { admin: 'supersecret' },
        challenge: true,
    }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customCss: swaggerCss,
    }),
);

// --- API Limiter ---
app.use('/', apiLimiter);

// --- Get Updates ---
app.use('/update-counts', updateRoutes);

// --- Routes ---
app.use('/wc-units', wcUnitRoutes);
app.use('/menus', menuRoutes);
app.use('/spots', spotRoutes);
app.use('/buffets', buffetRoutes);
app.use('/animals', animalRoutes);

app.use('/comments', commentRoutes);
app.use('/posts', postRoutes);

app.use('/people', personRoutes);
app.use('/tickets', ticketRoutes);
app.use('/ticket-types', ticketTypeRoutes);

app.use('/auth', authRoutes);

// --- 404 handler ---
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
});

// --- Error handler ---
app.use(errorHandler);

export default app;
