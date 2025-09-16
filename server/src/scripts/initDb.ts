import db from '../config/db.js';

export async function initDb() {
    try {
        db.query(
            'CREATE TABLE IF NOT EXISTS WCs (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT, name varchar(50)  NOT NULL UNIQUE)',
        );
        db.query(
            'CREATE TABLE IF NOT EXISTS icons (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT, name varchar(50)  NOT NULL UNIQUE, image_link varchar(50)  NOT NULL UNIQUE)',
        );
        db.query(
            'CREATE TABLE IF NOT EXISTS animal_types (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT, name varchar(50)  NOT NULL UNIQUE)',
        );
        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}
