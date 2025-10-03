import { body } from 'express-validator';

export const createWcUnitValidator = [
    body('name').trim().notEmpty().escape(),
    body('spotId').isInt({ min: 1 }),
];

export const updateWcUnitValidator = [
    body('name').optional().trim().notEmpty().escape(),
    body('spotId').optional().isInt({ min: 1 }),
];
