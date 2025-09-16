import { queryExec, queryRows } from './queryHelper.js';

export interface Status {
    id?: number;
    name: string;
    age: number;
}

/**
 * Get all Statusses
 * @returns Promise resolving to an array of all Status objects
 */
export async function getAllStatusses(): Promise<Status[]> {
    return queryRows<Status>('SELECT * FROM statusses');
}

/**
 * Get a single Status by ID
 * @param id The ID of the Status to fetch
 * @returns Promise resolving to the Status object if found, or null if not
 */
export async function getSingleStatus(id: number): Promise<Status | null> {
    const rows = await queryRows<Status>('SELECT * FROM statusses WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new Status
 * @param Status The Status object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted Status
 */
export async function createStatus(Status: Status): Promise<number> {
    const result = await queryExec('INSERT INTO statusses (name, age) VALUES (?, ?)', [
        Status.name,
        Status.age,
    ]);
    return result.insertId;
}

/**
 * Update an existing Status
 * @param id The ID of the Status to update
 * @param Status Partial Status object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export async function updateStatus(id: number, Status: Partial<Status>): Promise<boolean> {
    const result = await queryExec('UPDATE statusses SET name = ?, age = ? WHERE id = ?', [
        Status.name,
        Status.age,
        id,
    ]);
    return result.affectedRows > 0;
}

/**
 * Delete a Status by ID
 * @param id The ID of the Status to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export async function deleteStatus(id: number): Promise<boolean> {
    const result = await queryExec('DELETE FROM statusses WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
