import { Request, Response, NextFunction } from 'express';
import * as BuffetService from '../../models/map/buffetModel.js';

/**
 * Get all Buffets
 */
export const getBuffets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const buffets: BuffetService.Buffet[] = await BuffetService.getAllBuffets();
        res.status(200).json(buffets);
    } catch (err) {
        next(err);
    }
};

/**
 * Get a single Buffet by ID
 */
export const getBuffet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const buffet: BuffetService.Buffet | null = await BuffetService.getSingleBuffet(id);
        if (!buffet) return res.status(404).json({ error: 'Buffet not found' });
        res.status(200).json(buffet);
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new Buffet
 */
export const createBuffet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const buffetData: BuffetService.Buffet = req.body;
        const insertId: number = await BuffetService.createBuffet(buffetData);
        res.status(201).json({ message: 'Buffet created', id: insertId });
    } catch (err) {
        next(err);
    }
};

/**
 * Update an existing Buffet
 */
export const updateBuffet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const buffetData: BuffetService.Buffet = req.body;
        const updated: boolean = await BuffetService.updateBuffet(id, buffetData);
        if (!updated) return res.status(404).json({ error: 'Buffet not found or not updated' });
        res.status(200).json({ message: 'Buffet updated' });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete a Buffet by ID
 */
export const deleteBuffet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const deleted: boolean = await BuffetService.deleteBuffet(id);
        if (!deleted) return res.status(404).json({ error: 'Buffet not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
