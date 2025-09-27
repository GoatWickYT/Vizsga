import db from '../config/db.js';

async function initDb() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS Post (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Name TEXT NOT NULL,
                Description TEXT NOT NULL,
                Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                Comment VARCHAR()
            );
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS Comment (
                id INT AUTO_INCREMENT PRIMARY KEY,
                User VARCHAR(255) NOT NULL,
                Content TEXT NOT NULL,
                PostId INT,
                Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (PostId) REFERENCES Post(id) ON DELETE CASCADE
            );
        `);
        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        db.end(); 
    }
}

initDb();