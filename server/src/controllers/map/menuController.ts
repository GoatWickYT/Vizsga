import { Request, Response, NextFunction } from 'express';
import * as MenuService from '../../models/map/menuModel.js';

/**
 * Get all Menus
 */
export const getMenus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const menus: MenuService.Menu[] = await MenuService.getAllMenus();
        res.status(200).json(menus);
    } catch (err) {
        next(err);
    }
};

/**
 * Get a single Menu by ID
 */
export const getMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const menu: MenuService.Menu | null = await MenuService.getSingleMenu(id);
        if (!menu) return res.status(404).json({ error: 'Menu not found' });
        res.status(200).json(menu);
    } catch (err) {
        next(err);
    }
};

/**
 * Create a new Menu
 */
export const createMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const menuData: MenuService.Menu = req.body;
        const insertId: number = await MenuService.createMenu(menuData);
        res.status(201).json({ message: 'Menu created', id: insertId });
    } catch (err) {
        next(err);
    }
};

/**
 * Update an existing Menu
 */
export const updateMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const menuData: MenuService.Menu = req.body;
        const updated: boolean = await MenuService.updateMenu(id, menuData);
        if (!updated) return res.status(404).json({ error: 'Menu not found or not updated' });
        res.status(200).json({ message: 'Menu updated' });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete a Menu by ID
 */
export const deleteMenu = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const deleted: boolean = await MenuService.deleteMenu(id);
        if (!deleted) return res.status(404).json({ error: 'Menu not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
