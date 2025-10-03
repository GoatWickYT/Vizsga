import { Roles } from '../../types/roles.js';
import { queryExec, queryRows } from '../util/queryHelper.js';

export interface Person {
    id?: number;
    username: string;
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
        'INSERT INTO people (user_name, name, email, password, role, phone, credit_card) VALUES (?,?,?,?,?,?,?)',
        [
            person.username,
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
    const rows = await queryRows<Person>('SELECT * FROM people WHERE user_name = ?', [username]);
    return rows[0] || null;
};

export const getPersonByEmail = async (email: string): Promise<Person | null> => {
    const rows = await queryRows<Person>('SELECT * FROM people WHERE email = ?', [email]);
    return rows[0] || null;
};
export const updatePerson = async (id: number, person: Partial<Person>): Promise<boolean> => {
    const fields: string[] = [];
    const values: (string | number | boolean | null)[] = [];

    if (person.username !== undefined) {
        fields.push('user_name = ?');
        values.push(person.username);
    }
    if (person.name !== undefined) {
        fields.push('name = ?');
        values.push(person.name);
    }
    if (person.phone !== undefined) {
        fields.push('phone = ?');
        values.push(person.phone);
    }
    if (person.creditCard !== undefined) {
        fields.push('credit_card = ?');
        values.push(person.creditCard);
    }
    if (person.password !== undefined) {
        fields.push('password = ?');
        values.push(person.password);
    }
    if (person.role !== undefined) {
        fields.push('role = ?');
        values.push(person.role);
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE people SET ${fields.join(', ')} WHERE id = ?`;
    const result = await queryExec(query, values);
    return result.affectedRows > 0;
};

export const deletePerson = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM people WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
