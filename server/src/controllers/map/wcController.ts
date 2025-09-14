import { Request, Response, NextFunction } from 'express';
import * as WCService from '../../models/map/wcModel.js';

/**
 * Get all WCs
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const wcs = await WCService.getAllWCs();
        res.json(wcs);
    } catch (err) {
        next(err);
    }
}

/**
 * Get a single WC by ID
 */
export async function getSingle(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const wc = await WCService.getSingleWC(id);
        if (!wc) return res.status(404).json({ message: 'WC not found' });
        res.json(wc);
    } catch (err) {
        next(err);
    }
}

/**
 * Create a new WC
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const wcData = req.body;
        const insertId = await WCService.createWC(wcData);
        res.status(201).json({ message: 'WC created', id: insertId });
    } catch (err) {
        next(err);
    }
}

/**
 * Update an existing WC
 */
export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const wcData = req.body;
        const updated = await WCService.updateWC(id, wcData);
        if (!updated) return res.status(404).json({ message: 'WC not found or not updated' });
        res.json({ message: 'WC updated' });
    } catch (err) {
        next(err);
    }
}

/**
 * Delete a WC by ID
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const deleted = await WCService.deleteWC(id);
        if (!deleted) return res.status(404).json({ message: 'WC not found or not deleted' });
        res.json({ message: 'WC deleted' });
    } catch (err) {
        next(err);
    }
}
