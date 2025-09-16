import { queryExec, queryRows } from './queryHelper.js';

export interface WC {
    id?: number;
    name: string;
}

/**
 * Get all WCs
 * @returns Promise resolving to an array of all WC objects
 */
export async function getAllWCs(): Promise<WC[]> {
    return queryRows<WC>('SELECT * FROM WCs');
}

/**
 * Get a single WC by ID
 * @param id The ID of the WC to fetch
 * @returns Promise resolving to the WC object if found, or null if not
 */
export async function getSingleWC(id: number): Promise<WC | null> {
    const rows = await queryRows<WC>('SELECT * FROM WCs WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new WC
 * @param WC The WC object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted WC
 */
export async function createWC(WC: WC): Promise<number> {
    const result = await queryExec('INSERT INTO WCs (name) VALUES (?)', [WC.name]);
    return result.insertId;
}

/**
 * Update an existing WC
 * @param id The ID of the WC to update
 * @param WC Partial WC object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export async function updateWC(id: number, WC: Partial<WC>): Promise<boolean> {
    const result = await queryExec('UPDATE WCs SET name = ? WHERE id = ?', [WC.name, id]);
    return result.affectedRows > 0;
}

/**
 * Delete a WC by ID
 * @param id The ID of the WC to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export async function deleteWC(id: number): Promise<boolean> {
    const result = await queryExec('DELETE FROM WCs WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
