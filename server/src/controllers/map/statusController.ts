import { Request, Response, NextFunction } from 'express';
import * as StatusService from '../../models/map/statusModel.js';

/**
 * Get all Statusses
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const statusses = await StatusService.getAllStatusses();
        res.status(200).json(statusses);
    } catch (err) {
        next(err);
    }
}

/**
 * Get a single Status by ID
 */
export async function getSingle(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const status = await StatusService.getSingleStatus(id);
        if (!status) return res.status(404).json({ message: 'Status not found' });
        res.status(200).json(status);
    } catch (err) {
        next(err);
    }
}

/**
 * Create a new Status
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const statusData = req.body;
        const insertId = await StatusService.createStatus(statusData);
        res.status(201).json({ message: 'Status created', id: insertId });
    } catch (err) {
        next(err);
    }
}

/**
 * Update an existing Status
 */
export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const statusData = req.body;
        const updated = await StatusService.updateStatus(id, statusData);
        if (!updated) return res.status(404).json({ message: 'Status not found or not updated' });
        res.status(200).json({ message: 'Status updated' });
    } catch (err) {
        next(err);
    }
}

/**
 * Delete a Status by ID
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const deleted = await StatusService.deleteStatus(id);
        if (!deleted) return res.status(404).json({ message: 'Status not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
