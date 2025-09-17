import { Request, Response, NextFunction } from 'express';
import * as SpotService from '../../models/map/spotModel.js';

/**
 * Get all Spots
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const spots = await SpotService.getAllSpots();
        res.json(spots);
    } catch (err) {
        next(err);
    }
}

/**
 * Get a single Spot by ID
 */
export async function getSingle(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const spot = await SpotService.getSingleSpot(id);
        if (!spot) return res.status(404).json({ message: 'Spot not found' });
        res.json(spot);
    } catch (err) {
        next(err);
    }
}

/**
 * Create a new Spot
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const spotData = req.body;
        const insertId = await SpotService.createSpot(spotData);
        res.status(201).json({ message: 'Spot created', id: insertId });
    } catch (err) {
        next(err);
    }
}

/**
 * Update an existing Spot
 */
export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const spotData = req.body;
        const updated = await SpotService.updateSpot(id, spotData);
        if (!updated) return res.status(404).json({ message: 'Spot not found or not updated' });
        res.json({ message: 'Spot updated' });
    } catch (err) {
        next(err);
    }
}

/**
 * Delete a Spot by ID
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const deleted = await SpotService.deleteSpot(id);
        if (!deleted) return res.status(404).json({ message: 'Spot not found or not deleted' });
        res.json({ message: 'Spot deleted' });
    } catch (err) {
        next(err);
    }
}
