import { Request, Response, NextFunction } from 'express';
import * as IconService from '../../models/map/iconModel.js';

/**
 * Get all Icons
 */
export const getIcons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const icons = await IconService.getAllIcons();
        res.status(200).json(icons);
    } catch (err) {
        next(err);
    }
};

/**
 * Get a single Icon by ID
 */
export const getIcon = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const icon = await IconService.getSingleIcon(id);
        if (!icon) return res.status(404).json({ message: 'Icon not found' });
        res.status(200).json(icon);
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new Icon
 */
export const createIcon = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const iconData = req.body;
        const insertId = await IconService.createIcon(iconData);
        res.status(201).json({ message: 'Icon created', id: insertId });
    } catch (err) {
        next(err);
    }
};

/**
 * Update an existing Icon
 */
export const updateIcon = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const iconData = req.body;
        const updated = await IconService.updateIcon(id, iconData);
        if (!updated) return res.status(404).json({ message: 'Icon not found or not updated' });
        res.status(200).json({ message: 'Icon updated' });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete a Icon by ID
 */
export const deleteIcon = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const deleted = await IconService.deleteIcon(id);
        if (!deleted) return res.status(404).json({ message: 'Icon not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
