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

export interface Post {
    id?: number;
    Name: string;
    Description: string;
    Comment: string;
    Date?: Date;
}
export async function getAllPosts(): Promise<Post[]> {
    const [rows] = await db.query('SELECT * FROM posts');
    return rows as Post[];
}
export async function createPost(post: Post): Promise<void> {
    await db.query('INSERT INTO Post (Name, Description, Comment, Date) VALUES (?, ?, ?, ?, ?, ?)', [post.Name, post.Description, post.Comment, post.Date]);
}
export async function getPostById(id: number): Promise<Post | null> {
    const [rows] = await db.query('SELECT * FROM Post WHERE id = ?', [id]);
    const posts = rows as Post[];
    return posts.length > 0 ? posts[0] : null;
}

export async function updatePost(id: number, post: Post): Promise<void> {
    await db.query('UPDATE Post SET Name = ?, Description = ?, Comment = ?, Date= ? WHERE id = ?', [post.Name, post.Description, post.Comment, post.Date, id]);
}   

export async function deletePost(id: number): Promise<void> {
    await db.query('DELETE FROM Post WHERE id = ?', [id]);
}