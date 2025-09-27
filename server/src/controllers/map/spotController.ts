import { Request, Response, NextFunction } from 'express';
import * as SpotService from '../../models/map/spotModel.js';

/**
 * Get all Spots
 */
export const getSpots = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const spots = await SpotService.getAllSpots();
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
        const id = Number(req.params.id);
        const spot = await SpotService.getSingleSpot(id);
        if (!spot) return res.status(404).json({ message: 'Spot not found' });
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
        const spotData = req.body;
        const insertId = await SpotService.createSpot(spotData);
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
        const id = Number(req.params.id);
        const spotData = req.body;
        const updated = await SpotService.updateSpot(id, spotData);
        if (!updated) return res.status(404).json({ message: 'Spot not found or not updated' });
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
        const id = Number(req.params.id);
        const deleted = await SpotService.deleteSpot(id);
        if (!deleted) return res.status(404).json({ message: 'Spot not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
