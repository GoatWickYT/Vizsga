import { queryExec, queryRows } from '../util/queryHelper.js';

export interface WcUnit {
    id?: number;
    name: string;
    spotId?: number;
}

/**
 * Get all WcUnits
 * @returns Promise resolving to an array of all WcUnit objects
 */
export const getAllWcUnits = async (): Promise<WcUnit[]> => {
    return await queryRows<WcUnit>('SELECT * FROM wc_units');
};

/**
 * Get a single WcUnit by ID
 * @param id The ID of the WcUnit to fetch
 * @returns Promise resolving to the WcUnit object if found, or null if not
 */
export const getSingleWcUnit = async (id: number): Promise<WcUnit | null> => {
    const rows = await queryRows<WcUnit>('SELECT * FROM wc_units WHERE id = ?', [id]);
    return rows[0] || null;
};

/**
 * Create a new WcUnit
 * @param WcUnit The WcUnit object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted WcUnit
 */
export const createWcUnit = async (WcUnit: WcUnit): Promise<number> => {
    const result = await queryExec('INSERT INTO wc_units (name, spot_id) VALUES (?, ?)', [
        WcUnit.name,
        WcUnit.spotId,
    ]);
    return result.insertId;
};

/**
 * Update an existing WcUnit
 * @param id The ID of the WcUnit to update
 * @param WcUnit Partial WcUnit object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export const updateWcUnit = async (id: number, WcUnit: Partial<WcUnit>): Promise<boolean> => {
    const result = await queryExec('UPDATE wc_units SET name = ? WHERE id = ?', [WcUnit.name, id]);
    return result.affectedRows > 0;
};

/**
 * Delete a WcUnit by ID
 * @param id The ID of the WcUnit to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export const deleteWcUnit = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM wc_units WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
