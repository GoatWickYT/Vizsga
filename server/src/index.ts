import dotenv from 'dotenv';
import app from './app.js';
import db from './config/db.js';
import { initDb } from './scripts/initDb.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {
    await initDb();
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
    console.log('\nGracefully shutting down...');
    server.close(async () => {
        await db.end();
        console.log('Database pool closed.');
        process.exit(0);
    });
});
