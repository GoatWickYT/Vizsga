import db from '../config/db.js';

async function initDb() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS Post (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Title TEXT NOT NULL,
                Content TEXT NOT NULL,
                CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                Comment VARCHAR()
            );
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS Comment (
                id INT AUTO_INCREMENT PRIMARY KEY,
                UserName VARCHAR(255) NOT NULL,
                Content TEXT NOT NULL,
                PostId INT,
                CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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