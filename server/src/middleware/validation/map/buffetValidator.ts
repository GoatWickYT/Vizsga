import { body } from 'express-validator';

export const createBuffetValidator = [
    body('name').trim().notEmpty().escape(),
    body('menuId').isInt({ min: 1 }),
    body('spotId').isInt({ min: 1 }),
];

export const updateBuffetValidator = [
    body('name').optional().trim().notEmpty().escape(),
    body('menuId').optional().isInt({ min: 1 }),
    body('spotId').optional().isInt({ min: 1 }),
];
