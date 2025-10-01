import { Roles } from '../../types/roles.js';
import { queryExec, queryRows } from '../util/queryHelper.js';

export interface Person {
    id?: number;
    userName: string;
    name: string;
    phone?: string;
    email: string;
    creditCard?: string;
    password: string;
    role: Roles;
}

export const getAllPeople = async (): Promise<Person[]> => {
    return await queryRows<Person>('SELECT * FROM people');
};

export const createPerson = async (person: Person): Promise<number> => {
    const result = await queryExec(
        'INSERT INTO people (userName, name, email, password, role, phone, creditCard) VALUES (?,?,?,?,?,?,?)',
        [
            person.userName,
            person.name,
            person.email,
            person.password,
            person.role,
            person.phone || null,
            person.creditCard || null,
        ],
    );
    return result.insertId;
};

export const getPersonById = async (id: number): Promise<Person | null> => {
    const rows = await queryRows<Person>('SELECT * FROM people WHERE id = ?', [id]);
    return rows[0] || null;
};

export const getPersonByUsername = async (username: string): Promise<Person | null> => {
    const rows = await queryRows<Person>('SELECT * FROM people WHERE username = ?', [username]);
    return rows[0] || null;
};

export const getPersonByEmail = async (email: string): Promise<Person | null> => {
    const rows = await queryRows<Person>('SELECT * FROM people WHERE email = ?', [email]);
    return rows[0] || null;
};

export const updatePerson = async (id: number, person: Person): Promise<boolean> => {
    const result = await queryExec(
        'UPDATE people SET userName = ?, name = ?, phone = ?, creditCard = ?, password = ?, role = ? WHERE id = ?',
        [
            person.userName,
            person.name,
            person.phone,
            person.creditCard,
            person.password,
            person.role,
            id,
        ],
    );
    return result.affectedRows > 0;
};

export const deletePerson = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM people WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
