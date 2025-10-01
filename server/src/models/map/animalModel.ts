import { Type } from '../../types/animalTypes.js';
import { queryExec, queryRows } from '../util/queryHelper.js';

export interface Animal {
    id?: number;
    name: string;
    type: Type;
    description: string;
    adopter?: string;
    spotId?: number;
}

/**
 * Get all Animals
 * @returns Promise resolving to an array of all Animal objects
 */
export const getAllAnimals = async (): Promise<Animal[]> => {
    return await queryRows<Animal>('SELECT * FROM animals');
};

/**
 * Get a single Animal by ID
 * @param id The ID of the Animal to fetch
 * @returns Promise resolving to the Animal object if found, or null if not
 */
export const getSingleAnimal = async (id: number): Promise<Animal | null> => {
    const rows = await queryRows<Animal>('SELECT * FROM animals WHERE id = ?', [id]);
    return rows[0] || null;
};

/**
 * Create a new Animal
 * @param Animal The Animal object to insert (name required)
 * @returns Promise resolving to the ID of the newly inserted Animal
 */
export const createAnimal = async (Animal: Animal): Promise<number> => {
    const result = await queryExec(
        'INSERT INTO animals (name, description, spot_id, type, adopter) VALUES (?,?,?,?,?)',
        [Animal.name, Animal.description, Animal.spotId, Animal.type, Animal?.adopter],
    );
    return result.insertId;
};

/**
 * Update an existing Animal
 * @param id The ID of the Animal to update
 * @param Animal Partial Animal object with fields to update
 * @returns Promise resolving to true if a row was updated, false otherwise
 */
export const updateAnimal = async (id: number, Animal: Partial<Animal>): Promise<boolean> => {
    const result = await queryExec(
        'UPDATE animals WHERE id = ? SET name = ?, description = ?, type = ?, adopter = ? ',
        [id, Animal.name, Animal.description, Animal.type, Animal?.adopter],
    );
    return result.affectedRows > 0;
};

/**
 * Delete a Animal by ID
 * @param id The ID of the Animal to delete
 * @returns Promise resolving to true if a row was deleted, false otherwise
 */
export const deleteAnimal = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM animals WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
