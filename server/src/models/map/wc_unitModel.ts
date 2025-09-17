import { queryExec, queryRows } from './queryHelper.js';

export interface Wc_unit {
    id?: number;
    name: string;
    spotId?: number;
}

/**
 * Get all Wc_units
 * @returns Promise resolving to an array of all Wc_unit objects
 */
export async function getAllWc_units(): Promise<Wc_unit[]> {
    return queryRows<Wc_unit>('SELECT * FROM wc_units');
}

/**
 * Get a single Wc_unit by ID
 * @param id The ID of the Wc_unit to fetch
 * @returns Promise resolving to the Wc_unit object if found, or null if not
 */
export async function getSingleWc_unit(id: number): Promise<Wc_unit | null> {
    const rows = await queryRows<Wc_unit>('SELECT * FROM wc_units WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new Wc_unit
 * @param Wc_unit The Wc_unit object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted Wc_unit
 */
export async function createWc_unit(Wc_unit: Wc_unit): Promise<number> {
    const result = await queryExec('INSERT INTO wc_units (name, spot_id) VALUES (?, ?)', [
        Wc_unit.name,
        Wc_unit.spotId,
    ]);
    return result.insertId;
}

/**
 * Update an existing Wc_unit
 * @param id The ID of the Wc_unit to update
 * @param Wc_unit Partial Wc_unit object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export async function updateWc_unit(id: number, Wc_unit: Partial<Wc_unit>): Promise<boolean> {
    const result = await queryExec('UPDATE wc_units SET name = ? WHERE id = ?', [Wc_unit.name, id]);
    return result.affectedRows > 0;
}

/**
 * Delete a Wc_unit by ID
 * @param id The ID of the Wc_unit to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export async function deleteWc_unit(id: number): Promise<boolean> {
    const result = await queryExec('DELETE FROM wc_units WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
