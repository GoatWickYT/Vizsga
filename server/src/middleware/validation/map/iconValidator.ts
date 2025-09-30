import { body } from 'express-validator';

export const createIconValidator = [
    body('name').trim().notEmpty().escape(),
    body('imageLink').isInt({ min: 1 }),
    body('spotId').isInt({ min: 1 }),
];

export const updateIconValidator = [
    body('name').optional().trim().notEmpty().escape(),
    body('imageLink').optional().isInt({ min: 1 }),
    body('spotId').optional().isInt({ min: 1 }),
];
