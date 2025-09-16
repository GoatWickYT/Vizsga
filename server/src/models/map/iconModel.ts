import { queryExec, queryRows } from './queryHelper.js';
export interface Icon {
    id?: number;
    name: string;
    imageLink: string;
}

/**
 * Get all Icons
 * @returns Promise resolving to an array of all Icon objects
 */
export async function getAllIcons(): Promise<Icon[]> {
    return queryRows<Icon>('SELECT * FROM icons');
}

/**
 * Get a single Icon by ID
 * @param id The ID of the Icon to fetch
 * @returns Promise resolving to the Icon object if found, or null if not
 */
export async function getSingleIcon(id: number): Promise<Icon | null> {
    const rows = await queryRows<Icon>('SELECT * FROM icons WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new Icon
 * @param Icon The Icon object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted Icon
 */
export async function createIcon(Icon: Icon): Promise<number> {
    const result = await queryExec('INSERT INTO icons (name, image_link) VALUES (?, ?)', [
        Icon.name,
        Icon.imageLink,
    ]);
    return result.insertId;
}

/**
 * Update an existing Icon
 * @param id The ID of the Icon to update
 * @param Icon Partial Icon object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export async function updateIcon(id: number, Icon: Partial<Icon>): Promise<boolean> {
    const result = await queryExec('UPDATE icons SET name = ?, image_link = ? WHERE id = ?', [
        Icon.name,
        Icon.imageLink,
        id,
    ]);
    return result.affectedRows > 0;
}

/**
 * Delete a Icon by ID
 * @param id The ID of the Icon to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export async function deleteIcon(id: number): Promise<boolean> {
    const result = await queryExec('DELETE FROM icons WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
