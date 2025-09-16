import db from '../../config/db.js';
import type { ResultSetHeader } from 'mysql2';

export interface AnimalType {
    id?: number;
    name: string;
}

export async function queryRows<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await db.query(sql, params);
    return rows as T[];
}

export async function queryExec(sql: string, params?: any[]): Promise<ResultSetHeader> {
    const [result] = await db.query(sql, params);
    return result as ResultSetHeader;
}

/**
 * Get all AnimalTypes
 * @returns Promise resolving to an array of all AnimalType objects
 */
export async function getAllAnimalTypes(): Promise<AnimalType[]> {
    return queryRows<AnimalType>('SELECT * FROM animal_types');
}

/**
 * Get a single AnimalType by ID
 * @param id The ID of the AnimalType to fetch
 * @returns Promise resolving to the AnimalType object if found, or null if not
 */
export async function getSingleAnimalType(id: number): Promise<AnimalType | null> {
    const rows = await queryRows<AnimalType>('SELECT * FROM animal_types WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new AnimalType
 * @param AnimalType The AnimalType object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted AnimalType
 */
export async function createAnimalType(AnimalType: AnimalType): Promise<number> {
    const result = await queryExec('INSERT INTO animal_types (name) VALUES (?)', [AnimalType.name]);
    return result.insertId;
}

/**
 * Update an existing AnimalType
 * @param id The ID of the AnimalType to update
 * @param AnimalType Partial AnimalType object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export async function updateAnimalType(
    id: number,
    AnimalType: Partial<AnimalType>,
): Promise<boolean> {
    const result = await queryExec('UPDATE animal_types SET name = ? WHERE id = ?', [
        AnimalType.name,
        id,
    ]);
    return result.affectedRows > 0;
}

/**
 * Delete a AnimalType by ID
 * @param id The ID of the AnimalType to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export async function deleteAnimalType(id: number): Promise<boolean> {
    const result = await queryExec('DELETE FROM animal_types WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
