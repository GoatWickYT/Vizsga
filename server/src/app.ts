import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerSpec.js';
import wc_unitRoutes from './routes/map/wcUnitRoutes.js';
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
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customCss: `
            /* Backgrounds */
            .swagger-ui, html {
            background-color: #121212 !important;
            color: #eee !important;
            }

            .swagger-ui .topbar {
            background-color: #1f1f1f !important;
            border-bottom: 1px solid #333 !important;
            }

            .swagger-ui .info, 
            .swagger-ui .scheme-container,
            .swagger-ui .opblock-summary {
            background-color: #1a1a1a !important;
            color: #eee !important;
            }

            .swagger-ui .opblock-description-wrapper,
            .swagger-ui .parameters-container,
            .swagger-ui .responses-wrapper {
            background-color: #222 !important;
            color: #eee !important;
            }

            /* Text colors */
            .swagger-ui * {
            color: #eee !important;
            }

            /* Links */
            .swagger-ui a {
            color: #4ea1f3 !important;
            }

            /* Buttons */
            .swagger-ui .btn {
            background-color: #333 !important;
            color: #eee !important;
            border: 1px solid #555 !important;
            }

            /* Inputs */
            .swagger-ui input, 
            .swagger-ui select, 
            .swagger-ui textarea {
            background-color: #333 !important;
            color: #eee !important;
            border: 1px solid #555 !important;
            }

            /* Scrollbar (optional) */
            .swagger-ui::-webkit-scrollbar {
            width: 8px;
            }

            .swagger-ui::-webkit-scrollbar-track {
            background: #121212;
            }

            .swagger-ui::-webkit-scrollbar-thumb {
            background-color: #555;
            border-radius: 10px;
            }

            /* Expand/collapse icons */
            .swagger-ui .opblock-summary-control {
            color: #eee !important;
            }

    `,
    }),
);

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
