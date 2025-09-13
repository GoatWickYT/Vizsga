/*

//////////////////////////////////

Import DB and write the required functions

//////////////////////////////////



import db from '../config/db.js';

export interface User {
    id?: number;
    name: string;
    email: string;
}

export async function getAllUsers(): Promise<User[]> {
    const [rows] = await db.query('SELECT * FROM users');
    return rows as User[];
}

export async function createUser(user: User): Promise<void> {
    await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email]);
}
*/
