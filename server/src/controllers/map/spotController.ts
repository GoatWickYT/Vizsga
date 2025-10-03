import { Request, Response, NextFunction } from 'express';
import * as SpotService from '../../models/map/spotModel.js';

/**
 * Get all Spots
 */
export const getSpots = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const spots: SpotService.Spot[] = await SpotService.getAllSpots();
        res.status(200).json(spots);
    } catch (err) {
        next(err);
    }
};

/**
 * Get a single Spot by ID
 */
export const getSpot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const spot: SpotService.Spot | null = await SpotService.getSingleSpot(id);
        if (!spot) return res.status(404).json({ error: 'Spot not found' });
        res.status(200).json(spot);
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new Spot
 */
export const createSpot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const spotData: SpotService.Spot = req.body;
        const insertId: number = await SpotService.createSpot(spotData);
        res.status(201).json({ message: 'Spot created', id: insertId });
    } catch (err) {
        next(err);
    }
};

/**
 * Update an existing Spot
 */
export const updateSpot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const spotData: SpotService.Spot = req.body;
        const updated: boolean = await SpotService.updateSpot(id, spotData);
        if (!updated) return res.status(404).json({ error: 'Spot not found or not updated' });
        res.status(200).json({ message: 'Spot updated' });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete a Spot by ID
 */
export const deleteSpot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const deleted: boolean = await SpotService.deleteSpot(id);
        if (!deleted) return res.status(404).json({ error: 'Spot not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
