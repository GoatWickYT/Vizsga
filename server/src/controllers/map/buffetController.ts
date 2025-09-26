import { Request, Response, NextFunction } from 'express';
import * as BuffetService from '../../models/map/buffetModel.js';

/**
 * Get all Buffets
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const buffets = await BuffetService.getAllBuffets();
        res.status(200).json(buffets);
    } catch (err) {
        next(err);
    }
}

/**
 * Get a single Buffet by ID
 */
export async function getSingle(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const buffet = await BuffetService.getSingleBuffet(id);
        if (!buffet) return res.status(404).json({ message: 'Buffet not found' });
        res.status(200).json(buffet);
    } catch (err) {
        next(err);
    }
}

/**
 * Create a new Buffet
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const buffetData = req.body;
        const insertId = await BuffetService.createBuffet(buffetData);
        res.status(201).json({ message: 'Buffet created', id: insertId });
    } catch (err) {
        next(err);
    }
}

/**
 * Update an existing Buffet
 */
export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const buffetData = req.body;
        const updated = await BuffetService.updateBuffet(id, buffetData);
        if (!updated) return res.status(404).json({ message: 'Buffet not found or not updated' });
        res.status(200).json({ message: 'Buffet updated' });
    } catch (err) {
        next(err);
    }
}

/**
 * Delete a Buffet by ID
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const deleted = await BuffetService.deleteBuffet(id);
        if (!deleted) return res.status(404).json({ message: 'Buffet not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
