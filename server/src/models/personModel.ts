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

export interface Person {
    id?: number;
    UserName: string;
    Name: string;
    Phone?: string;
    Email: string;
    CreditCard?: string;
    Password: string;
}

export async function getAllPeople(): Promise<Person[]> {
    const [rows] = await db.query('SELECT * FROM Person');
    return rows as Person[];
}

export async function createPerson(person: Person): Promise<void> {
    await db.query('INSERT INTO Person (UserName, Name, Phone, Email, CreditCard, Password) VALUES (?, ?, ?, ?, ?, ?)', [person.UserName, person.Name, person.Phone, person.Email, person.CreditCard, person.Password]);
}

export async function getPersonById(id: number): Promise<Person | null> {
    const [rows] = await db.query('SELECT * FROM Person WHERE id = ?', [id]);
    const people = rows as Person[];
    return people.length > 0 ? people[0] : null;
}

export async function updatePerson(id: number, person: Person): Promise<void> {
    await db.query('UPDATE Person SET UserName = ?, Name = ?, Phone = ?, Email = ?, CreditCard = ?, Password = ? WHERE id = ?', [person.UserName, person.Name, person.Phone, person.Email, person.CreditCard, person.Password, id]);
}   

export async function deletePerson(id: number): Promise<void> {
    await db.query('DELETE FROM Person WHERE id = ?', [id]);
}

