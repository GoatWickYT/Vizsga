import { Request, Response, NextFunction } from 'express';
import * as WCService from '../../models/map/wcUnitModel.js';

/**
 * Get all WCs
 */
export const getWcUnits = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wcs: WCService.WcUnit[] = await WCService.getAllWcUnits();
        res.status(200).json(wcs);
    } catch (err) {
        next(err);
    }
};

/**
 * Get a single WC by ID
 */
export const getWcUnit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const wc: WCService.WcUnit | null = await WCService.getSingleWcUnit(id);
        if (!wc) return res.status(404).json({ error: 'WC not found' });
        res.status(200).json(wc);
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new WC
 */
export const createWcUnit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wcData: WCService.WcUnit = req.body;
        const insertId: number = await WCService.createWcUnit(wcData);
        res.status(201).json({ message: 'WC created', id: insertId });
    } catch (err) {
        next(err);
    }
};

/**
 * Update an existing WC
 */
export const updateWcUnit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const wcData: WCService.WcUnit = req.body;
        const updated: boolean = await WCService.updateWcUnit(id, wcData);
        if (!updated) return res.status(404).json({ error: 'WC not found or not updated' });
        res.status(200).json({ message: 'WC updated' });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete a WC by ID
 */
export const deleteWcUnit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const deleted: boolean = await WCService.deleteWcUnit(id);
        if (!deleted) return res.status(404).json({ error: 'WC not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
