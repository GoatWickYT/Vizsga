import express from 'express';
// import the routes from ./routes/*.js, always ends in '.js'
// import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
// app.use('/users', userRoutes);

export default app;
