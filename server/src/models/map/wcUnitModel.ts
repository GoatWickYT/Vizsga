import { queryExec, queryRows } from './queryHelper.js';

export interface WcUnit {
    id?: number;
    name: string;
    spotId?: number;
}

/**
 * Get all WcUnits
 * @returns Promise resolving to an array of all WcUnit objects
 */
export async function getAllWcUnits(): Promise<WcUnit[]> {
    return queryRows<WcUnit>('SELECT * FROM Wc_units');
}

/**
 * Get a single WcUnit by ID
 * @param id The ID of the WcUnit to fetch
 * @returns Promise resolving to the WcUnit object if found, or null if not
 */
export async function getSingleWcUnit(id: number): Promise<WcUnit | null> {
    const rows = await queryRows<WcUnit>('SELECT * FROM Wc_units WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new WcUnit
 * @param WcUnit The WcUnit object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted WcUnit
 */
export async function createWcUnit(WcUnit: WcUnit): Promise<number> {
    const result = await queryExec('INSERT INTO Wc_units (name, spot_id) VALUES (?, ?)', [
        WcUnit.name,
        WcUnit.spotId,
    ]);
    return result.insertId;
}

/**
 * Update an existing WcUnit
 * @param id The ID of the WcUnit to update
 * @param WcUnit Partial WcUnit object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export async function updateWcUnit(id: number, WcUnit: Partial<WcUnit>): Promise<boolean> {
    const result = await queryExec('UPDATE Wc_units SET name = ? WHERE id = ?', [WcUnit.name, id]);
    return result.affectedRows > 0;
}

/**
 * Delete a WcUnit by ID
 * @param id The ID of the WcUnit to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export async function deleteWcUnit(id: number): Promise<boolean> {
    const result = await queryExec('DELETE FROM Wc_units WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
