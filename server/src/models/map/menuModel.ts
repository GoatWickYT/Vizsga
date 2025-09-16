import { queryExec, queryRows } from './queryHelper.js';

export interface Menu {
    id?: number;
    name: string;
    price: number;
    available: boolean;
}

/**
 * Get all Menus
 * @returns Promise resolving to an array of all Menu objects
 */
export async function getAllMenus(): Promise<Menu[]> {
    return queryRows<Menu>('SELECT * FROM menus');
}

/**
 * Get a single Menu by ID
 * @param id The ID of the Menu to fetch
 * @returns Promise resolving to the Menu object if found, or null if not
 */
export async function getSingleMenu(id: number): Promise<Menu | null> {
    const rows = await queryRows<Menu>('SELECT * FROM menus WHERE id = ?', [id]);
    return rows[0] || null;
}

/**
 * Create a new Menu
 * @param Menu The Menu object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted Menu
 */
export async function createMenu(Menu: Menu): Promise<number> {
    const result = await queryExec('INSERT INTO menus (name, price, available) VALUES (?,?,?)', [
        Menu.name,
        Menu.price,
        Menu.available,
    ]);
    return result.insertId;
}

/**
 * Update an existing Menu
 * @param id The ID of the Menu to update
 * @param Menu Partial Menu object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export async function updateMenu(id: number, Menu: Partial<Menu>): Promise<boolean> {
    const result = await queryExec(
        'UPDATE menus SET name = ?, price = ?, available = ? WHERE id = ?',
        [Menu.name, Menu.price, Menu.available, id],
    );
    return result.affectedRows > 0;
}

/**
 * Delete a Menu by ID
 * @param id The ID of the Menu to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export async function deleteMenu(id: number): Promise<boolean> {
    const result = await queryExec('DELETE FROM menus WHERE id = ?', [id]);
    return result.affectedRows > 0;
}
