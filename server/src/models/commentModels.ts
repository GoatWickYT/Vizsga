/*

//////////////////////////////////

This file is for connecting the database.
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

import db from '../config/db.js';

export interface Comment {
    id?: number;
    User: string;
    Content: string;
    Date?: Date;
}
export async function getAllComments(): Promise<Comment[]> {
    const [rows] = await db.query('SELECT * FROM omments');
    return rows as Comment[];
}

export async function createComment(comment: Comment): Promise<void> {
    await db.query('INSERT INTO Commnet (User, Content, Date) VALUES (?, ?, ?, ?, ?, ?)', [comment.User, comment.Content, comment.Date]);
}

export async function getCommnetById(id: number): Promise<Comment | null> {
    const [rows] = await db.query('SELECT * FROM Comment WHERE id = ?', [id]);
    const commnets = rows as Comment[];
    return commnets.length > 0 ? commnets[0] : null;
}

export async function updateComment(id: number, comment: Comment): Promise<void> {
    await db.query('UPDATE Commnet SET User = ?, Contnet = ?, Date= ? WHERE id = ?', [comment.User, comment.Content, comment.Date, id]);
}   

export async function deleteComment(id: number): Promise<void> {
    await db.query('DELETE FROM Comment WHERE id = ?', [id]);
}