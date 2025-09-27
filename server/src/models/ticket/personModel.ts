import { queryExec, queryRows } from '../util/queryHelper.js';

export interface Person {
    id?: number;
    userName: string;
    name: string;
    phone?: string;
    email: string;
    creditCard?: string;
    password: string;
}

export const getAllPeople = async (): Promise<Person[]> => {
    return await queryRows<Person>('SELECT * FROM people');
};

export const createPerson = async (person: Person): Promise<number> => {
    const result = await queryExec(
        'INSERT INTO people (userName, name, phone, email, creditCard, password) VALUES (?,?,?,?,?,?)',
        [
            person.userName,
            person.name,
            person.phone,
            person.email,
            person.creditCard,
            person.password,
        ],
    );
    return result.insertId;
};

export const getPersonById = async (id: number): Promise<Person | null> => {
    const rows = await queryRows<Person>('SELECT * FROM people WHERE id = ?', [id]);
    return rows[0] || null;
};

export const updatePerson = async (id: number, person: Person): Promise<boolean> => {
    const result = await queryExec(
        'UPDATE people SET userName = ?, name = ?, phone = ?, creditCard = ?, password = ? WHERE id = ?',
        [person.userName, person.name, person.phone, person.creditCard, person.password, id],
    );
    return result.affectedRows > 0;
};

export const deletePerson = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM people WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
