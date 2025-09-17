import { queryExec, queryRows } from './queryHelper.js';

export interface Spot {
    id?: number;
    name: string;
    location_x: number;
    location_y: number;
}

/**
 * Get all Spots
 * @returns Promise resolving to an array of all Spot objects
 */
export async function getAllSpots(): Promise<Spot[]> {
    return queryRows<Spot>('SELECT * FROM spots');
}

/**
 * Get a single Spot by ID
 * @param id The ID of the Spot to fetch
 * @returns Promise resolving to the Spot object if found, or null if not
 */
export async function getSingleSpot(id: number): Promise<Spot | null> {
    const rows = await queryRows<Spot>('SELECT * FROM spots WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new Spot
 * @param Spot The Spot object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted Spot
 */
export async function createSpot(Spot: Spot): Promise<number> {
    const result = await queryExec(
        'INSERT INTO spots (name, location_x, location_y) VALUES (?,?,?)',
        [Spot.name, Spot.location_x, Spot.location_y],
    );
    return result.insertId;
}

/**
 * Update an existing Spot
 * @param id The ID of the Spot to update
 * @param Spot Partial Spot object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export async function updateSpot(id: number, Spot: Partial<Spot>): Promise<boolean> {
    const result = await queryExec(
        'UPDATE spots SET name = ?, location_x = ?, location_y = ? WHERE id = ?',
        [Spot.name, Spot.location_x, Spot.location_y, id],
    );
    return result.affectedRows > 0;
}

/**
 * Delete a Spot by ID
 * @param id The ID of the Spot to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export async function deleteSpot(id: number): Promise<boolean> {
    const result = await queryExec('DELETE FROM spots WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
