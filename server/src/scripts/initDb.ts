import db from '../config/db.js';

async function initDb() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS Person (
                id INT AUTO_INCREMENT PRIMARY KEY,
                UserName VARCHAR(255) NOT NULL,
                Name VARCHAR(255) NOT NULL,
                Phone VARCHAR(20),
                Email VARCHAR(255) UNIQUE NOT NULL,
                CreditCard VARCHAR(20),
                Password VARCHAR(255) NOT NULL
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS Ticket (
                id INT AUTO_INCREMENT PRIMARY KEY,
                User VARCHAR(255) NOT NULL,
                Amount INT NOT NULL,
                Type VARCHAR(50) NOT NULL
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS TicketType (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Name VARCHAR(50) NOT NULL,
                Price DECIMAL(10, 2) NOT NULL
            );
        `);
        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        db.end(); // close the connection pool
    }
}

initDb();
