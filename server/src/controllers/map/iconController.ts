import { Request, Response, NextFunction } from 'express';
import * as IconService from '../../models/map/iconModel.js';

/**
 * Get all Icon
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const icons = await IconService.getAllIcons();
        res.json(icons);
    } catch (err) {
        next(err);
    }
}

/**
 * Get a single Icon by ID
 */
export async function getSingle(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const icon = await IconService.getSingleIcon(id);
        if (!icon) return res.status(404).json({ message: 'Icon not found' });
        res.json(icon);
    } catch (err) {
        next(err);
    }
}

/**
 * Create a new Icon
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const iconData = req.body;
        const insertId = await IconService.createIcon(iconData);
        res.status(201).json({ message: 'Icon created', id: insertId });
    } catch (err) {
        next(err);
    }
}

/**
 * Update an existing Icon
 */
export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const iconData = req.body;
        const updated = await IconService.updateIcon(id, iconData);
        if (!updated) return res.status(404).json({ message: 'Icon not found or not updated' });
        res.json({ message: 'Icon updated' });
    } catch (err) {
        next(err);
    }
}

/**
 * Delete a Icon by ID
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const deleted = await IconService.deleteIcon(id);
        if (!deleted) return res.status(404).json({ message: 'Icon not found or not deleted' });
        res.json({ message: 'Icon deleted' });
    } catch (err) {
        next(err);
    }
}
