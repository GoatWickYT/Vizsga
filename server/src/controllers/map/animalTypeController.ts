import { Request, Response, NextFunction } from 'express';
import * as AnimalTypeService from '../../models/map/animalTypeModel.js';

/**
 * Get all AnimalTypes
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const animalTypes = await AnimalTypeService.getAllAnimalTypes();
        res.status(200).json(animalTypes);
    } catch (err) {
        next(err);
    }
}

/**
 * Get a single AnimalType by ID
 */
export async function getSingle(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const animalType = await AnimalTypeService.getSingleAnimalType(id);
        if (!animalType) return res.status(404).json({ message: 'AnimalType not found' });
        res.status(200).json(animalType);
    } catch (err) {
        next(err);
    }
}

/**
 * Create a new AnimalType
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const animalTypeData = req.body;
        const insertId = await AnimalTypeService.createAnimalType(animalTypeData);
        res.status(201).json({ message: 'AnimalType created', id: insertId });
    } catch (err) {
        next(err);
    }
}

/**
 * Update an existing AnimalType
 */
export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const animalTypeData = req.body;
        const updated = await AnimalTypeService.updateAnimalType(id, animalTypeData);
        if (!updated)
            return res.status(404).json({ message: 'AnimalType not found or not updated' });
        res.status(200).json({ message: 'AnimalType updated' });
    } catch (err) {
        next(err);
    }
}

/**
 * Delete a AnimalType by ID
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const deleted = await AnimalTypeService.deleteAnimalType(id);
        if (!deleted)
            return res.status(404).json({ message: 'AnimalType not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
