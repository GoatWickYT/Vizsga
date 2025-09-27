import db from '../config/db.js';

export const initDb = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS spots
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                location_x INT NOT NULL UNIQUE,
                location_y INT NOT NULL UNIQUE)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS animals
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
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
        await db.query(`
            CREATE TABLE IF NOT EXISTS icons
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                spot_id INT NOT NULL UNIQUE,
                image_link VARCHAR(50) NOT NULL UNIQUE,
                FOREIGN KEY (spot_id) REFERENCES spots(id) ON DELETE CASCADE)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS animal_types
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                animal_id INT NOT NULL,
                FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS menus
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                price double NOT NULL,
                available BOOLEAN)
        `);
        await db.query(`
            CREATE TABLE IF NOT EXISTS statuses
                (id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                age tinyINT,
                spot_id INT NOT NULL UNIQUE,
                FOREIGN KEY (spot_id) REFERENCES spots(id) ON DELETE CASCADE)
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
                description  VARCHAR(255) NOT NULL,
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
                    password VARCHAR(100) NOT NULL)
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
        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};
