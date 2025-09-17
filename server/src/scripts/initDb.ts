import db from '../config/db.js';

export async function initDb() {
    try {
        await db.query(
            'CREATE TABLE IF NOT EXISTS spots' +
                ' (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,' +
                ' name varchar(50) NOT NULL UNIQUE,' +
                ' location_x int NOT NULL UNIQUE,' +
                ' location_y int NOT NULL UNIQUE)',
            // 'comment_id int NOT NULL'+ 'FOREIGN KEY (comment_id) REFERENCES comments(id)',
        );
        db.query(
            'CREATE TABLE IF NOT EXISTS animals' +
                ' (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,' +
                ' name varchar(50) NOT NULL UNIQUE,' +
                ' description varchar(200) NOT NULL,' +
                ' adopter varchar(50),' +
                ' spot_id int NOT NULL UNIQUE,' +
                ' FOREIGN KEY (spot_id) REFERENCES spots(id))',
        );
        db.query(
            'CREATE TABLE IF NOT EXISTS wc_units' +
                ' (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,' +
                ' name varchar(50) NOT NULL UNIQUE,' +
                ' spot_id int NOT NULL UNIQUE,' +
                ' FOREIGN KEY (spot_id) REFERENCES spots(id))',
        );
        db.query(
            'CREATE TABLE IF NOT EXISTS icons' +
                ' (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,' +
                ' name varchar(50) NOT NULL UNIQUE,' +
                ' spot_id int NOT NULL UNIQUE,' +
                ' image_link varchar(50) NOT NULL UNIQUE,' +
                ' FOREIGN KEY (spot_id) REFERENCES spots(id))',
        );
        db.query(
            'CREATE TABLE IF NOT EXISTS animal_types' +
                ' (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,' +
                ' name varchar(50) NOT NULL UNIQUE,' +
                ' animal_id int NOT NULL,' +
                ' FOREIGN KEY (animal_id) REFERENCES animals(id))',
        );
        db.query(
            'CREATE TABLE IF NOT EXISTS menus' +
                ' (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,' +
                ' name varchar(50) NOT NULL UNIQUE,' +
                ' price double NOT NULL,' +
                ' available BOOLEAN)',
        );
        db.query(
            'CREATE TABLE IF NOT EXISTS statusses' +
                ' (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,' +
                ' name varchar(50) NOT NULL UNIQUE,' +
                ' age tinyint,' +
                ' spot_id int NOT NULL UNIQUE,' +
                ' FOREIGN KEY (spot_id) REFERENCES spots(id))',
        );
        db.query(
            'CREATE TABLE IF NOT EXISTS buffets' +
                ' (id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,' +
                ' name varchar(50) NOT NULL UNIQUE,' +
                ' menu_id int NOT NULL,' +
                ' spot_id int NOT NULL UNIQUE,' +
                ' FOREIGN KEY (menu_id) REFERENCES menus(id),' +
                ' FOREIGN KEY (spot_id) REFERENCES spots(id))',
        );
        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}
