import { Request, Response, NextFunction } from 'express';
import * as MenuService from '../../models/map/menuModel.js';

/**
 * Get all Menus
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const menus = await MenuService.getAllMenus();
        res.json(menus);
    } catch (err) {
        next(err);
    }
}

/**
 * Get a single Menu by ID
 */
export async function getSingle(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const menu = await MenuService.getSingleMenu(id);
        if (!menu) return res.status(404).json({ message: 'Menu not found' });
        res.json(menu);
    } catch (err) {
        next(err);
    }
}

/**
 * Create a new Menu
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const menuData = req.body;
        const insertId = await MenuService.createMenu(menuData);
        res.status(201).json({ message: 'Menu created', id: insertId });
    } catch (err) {
        next(err);
    }
}

/**
 * Update an existing Menu
 */
export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const menuData = req.body;
        const updated = await MenuService.updateMenu(id, menuData);
        if (!updated) return res.status(404).json({ message: 'Menu not found or not updated' });
        res.json({ message: 'Menu updated' });
    } catch (err) {
        next(err);
    }
}

/**
 * Delete a Menu by ID
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const deleted = await MenuService.deleteMenu(id);
        if (!deleted) return res.status(404).json({ message: 'Menu not found or not deleted' });
        res.json({ message: 'Menu deleted' });
    } catch (err) {
        next(err);
    }
}
