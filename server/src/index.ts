import { config } from './config/env.js';
import app from './app.js';
import db from './config/db.js';
import { initDb } from './scripts/initDb.js';

const PORT = config.port;

const server = app.listen(PORT, async () => {
    await initDb();
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

process.on('SIGINT', async () => {
    console.log('\nGracefully shutting down...');
    server.close(async () => {
        await db.end();
        console.log('Database pool closed.');
        process.exit(0);
    });
});
