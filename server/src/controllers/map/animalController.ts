import { Request, Response, NextFunction } from 'express';
import * as AnimalService from '../../models/map/animalModel.js';

/**
 * Get all Animals
 */
export const getAnimals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const animals: AnimalService.Animal[] = await AnimalService.getAllAnimals();
        res.status(200).json(animals);
    } catch (err) {
        next(err);
    }
};

/**
 * Get a single Animal by ID
 */
export const getAnimal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const animal: AnimalService.Animal | null = await AnimalService.getSingleAnimal(id);
        if (!animal) return res.status(404).json({ error: 'Animal not found' });
        res.status(200).json(animal);
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new Animal
 */
export const createAnimal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const animalData: AnimalService.Animal = req.body;
        const insertId: number = await AnimalService.createAnimal(animalData);
        res.status(201).json({ message: 'Animal created', id: insertId });
    } catch (err) {
        next(err);
    }
};

/**
 * Update an existing Animal
 */
export const updateAnimal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const animalData: AnimalService.Animal = req.body;
        const updated: boolean = await AnimalService.updateAnimal(id, animalData);
        if (!updated) return res.status(404).json({ error: 'Animal not found or not updated' });
        res.status(200).json({ message: 'Animal updated' });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete a Animal by ID
 */
export const deleteAnimal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const deleted: boolean = await AnimalService.deleteAnimal(id);
        if (!deleted) return res.status(404).json({ error: 'Animal not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
