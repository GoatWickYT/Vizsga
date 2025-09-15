import db from '../config/db.js';

async function initDb() {
    try {
        //yes
        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        db.end(); // close the connection pool
    }
}

initDb();
