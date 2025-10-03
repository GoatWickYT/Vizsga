import { queryExec, queryRows } from '../util/queryHelper.js';

export interface Buffet {
    id?: number;
    name: string;
    menuId: number;
    spotId: number;
}

/**
 * Get all Buffets
 * @returns Promise resolving to an array of all Buffet objects
 */
export const getAllBuffets = async (): Promise<Buffet[]> => {
    return await queryRows<Buffet>('SELECT * FROM buffets');
};

/**
 * Get a single Buffet by ID
 * @param id The ID of the Buffet to fetch
 * @returns Promise resolving to the Buffet object if found, or null if not
 */
export const getSingleBuffet = async (id: number): Promise<Buffet | null> => {
    const rows = await queryRows<Buffet>('SELECT * FROM buffets WHERE id = ?', [id]);
    return rows[0] || null;
};

/**
 * Create a new Buffet
 * @param Buffet The Buffet object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted Buffet
 */
export const createBuffet = async (Buffet: Buffet): Promise<number> => {
    const result = await queryExec(
        'INSERT INTO buffets (name, menu_id, spot_id) VALUES (?, ?, ?)',
        [Buffet.name, Buffet.menuId, Buffet.spotId],
    );
    return result.insertId;
};

/**
 * Update an existing Buffet
 * @param id The ID of the Buffet to update
 * @param Buffet Partial Buffet object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export const updateBuffet = async (id: number, Buffet: Partial<Buffet>): Promise<boolean> => {
    const result = await queryExec('UPDATE buffets SET name = ? WHERE id = ?', [Buffet.name, id]);
    return result.affectedRows > 0;
};

/**
 * Delete a Buffet by ID
 * @param id The ID of the Buffet to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export const deleteBuffet = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM buffets WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
