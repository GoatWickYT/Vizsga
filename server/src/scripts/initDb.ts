import db from '../config/db.js';

export const initDb = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS spots
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                location_x INT NOT NULL UNIQUE,
                location_y INT NOT NULL UNIQUE,
                icon VARCHAR(40),
                status VARCHAR(10) NOT NULL)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS animals
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                type VARCHAR(10) NOT NULL,
                description VARCHAR(200) NOT NULL,
                adopter VARCHAR(50),
                spot_id INT NOT NULL UNIQUE,
                FOREIGN KEY (spot_id) REFERENCES spots(id) ON DELETE CASCADE)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS wc_units
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                spot_id INT NOT NULL UNIQUE,
                FOREIGN KEY (spot_id) REFERENCES spots(id) ON DELETE CASCADE)
        `);
        db.query(`
            CREATE TABLE IF NOT EXISTS menus
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                price double NOT NULL,
                available BOOLEAN NOT NULL)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS buffets
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                menu_id INT NOT NULL,
                spot_id INT NOT NULL UNIQUE,
                FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE RESTRICT,
                FOREIGN KEY (spot_id) REFERENCES spots(id) ON DELETE CASCADE)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                description VARCHAR(255) NOT NULL,
                imageLink VARCHAR(255),
                important BOOLEAN NOT NULL,
                likeCount INT DEFAULT 0,
                dislikeCount INT DEFAULT 0,
                views INT DEFAULT 0,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS people (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(20) NOT NULL,
                name VARCHAR(40) NOT NULL,
                phone VARCHAR(20),
                email VARCHAR(50) UNIQUE NOT NULL,
                credit_card VARCHAR(20),
                role VARCHAR(20) NOT NULL,
                password VARCHAR(255) NOT NULL)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user VARCHAR(50) NOT NULL,
                content VARCHAR(255) NOT NULL,
                post_id INT,
                user_id INT,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES people(id) ON DELETE CASCADE)
         `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS ticket_types (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                price FLOAT NOT NULL)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS tickets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                type_id INT NOT NULL,
                amount INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES people(id) ON DELETE CASCADE,
                FOREIGN KEY (type_id) REFERENCES ticket_types(id) ON DELETE RESTRICT)
        `);
        await db.query(`
            CREATE TABLE refresh_tokens (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                token VARCHAR(255) NOT NULL,
                device VARCHAR(50) NOT NULL,
                revoked BOOLEAN DEFAULT FALSE,
                expiry TIMESTAMP NOT NULL,
                created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES people(id) ON DELETE CASCADE)
            `);
        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};
