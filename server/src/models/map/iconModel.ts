import db from '../../config/db.js';
import type { ResultSetHeader } from 'mysql2';

export interface Icon {
    id?: number;
    name: string;
    imageLink: string;
}

/**
 * Generic query helper
 * @template T Type of the rows to return
 * @param sql SQL query string
 * @param params Optional array of query parameters
 * @returns Promise resolving to an array of typed rows
 */
async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await db.query(sql, params);
    return rows as T[];
}

/**
 * Get all Icons
 * @returns Promise resolving to an array of all Icon objects
 */
export async function getAllIcons(): Promise<Icon[]> {
    return query<Icon>('SELECT * FROM icons');
}

/**
 * Get a single Icon by ID
 * @param id The ID of the Icon to fetch
 * @returns Promise resolving to the Icon object if found, or null if not
 */
export async function getSingleIcon(id: number): Promise<Icon | null> {
    const rows = await query<Icon>('SELECT * FROM icons WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new Icon
 * @param Icon The Icon object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted Icon
 */
export async function createIcon(Icon: Icon): Promise<number> {
    const result = await query<ResultSetHeader>(
        'INSERT INTO icons (name, imageLink) VALUES (?, ?)',
        [Icon.name, Icon.imageLink],
    );
    return result[0].insertId;
}

/**
 * Update an existing Icon
 * @param id The ID of the Icon to update
 * @param Icon Partial Icon object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export async function updateIcon(id: number, Icon: Partial<Icon>): Promise<boolean> {
    const result = await query<ResultSetHeader>(
        'UPDATE icons SET name = ? imageLink = ? WHERE id = ?',
        [Icon.name, Icon.imageLink, id],
    );
    return result[0].affectedRows > 0;
}

/**
 * Delete a Icon by ID
 * @param id The ID of the Icon to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export async function deleteIcon(id: number): Promise<boolean> {
    const result = await query<ResultSetHeader>('DELETE FROM icons WHERE id = ?', [id]);
    return result[0].affectedRows > 0;
}
