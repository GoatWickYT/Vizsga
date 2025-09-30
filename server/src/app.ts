import fs from 'fs';
import cors from 'cors';
import csurf from 'csurf';
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
import iconRoutes from './routes/map/iconRoutes.js';
import spotRoutes from './routes/map/spotRoutes.js';
import wcUnitRoutes from './routes/map/wcUnitRoutes.js';
import animalRoutes from './routes/map/animalRoutes.js';
import statusRoutes from './routes/map/statusRoutes.js';
import buffetRoutes from './routes/map/buffetRoutes.js';
import animalTypeRoutes from './routes/map/animalTypeRoutes.js';

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

const csrfProtection = csurf({
    cookie: {
        key: 'XSRF-TOKEN',
        httpOnly: false,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    },
    value: (req) => {
        return (req.headers['x-csrf-token'] as string) || '';
    },
});

// --- Global middleware ---
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(csrfProtection);

app.get('/csrf-token', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), {
        httpOnly: false,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    }).json({ csrfToken: req.csrfToken() });
});

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
app.use('/icons', iconRoutes);
app.use('/menus', menuRoutes);
app.use('/spots', spotRoutes);
app.use('/buffets', buffetRoutes);
app.use('/statuses', statusRoutes);
app.use('/animals', animalRoutes);
app.use('/animal-types', animalTypeRoutes);

app.use('/comments', commentRoutes);
app.use('/posts', postRoutes);

app.use('/people', personRoutes);
app.use('/tickets', ticketRoutes);
app.use('/ticket-types', ticketTypeRoutes);

// --- 404 handler ---
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
});

// --- Error handler ---
app.use(errorHandler);

export default app;
