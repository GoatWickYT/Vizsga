import { body } from 'express-validator';

export const createMenuValidator = [
    body('name').trim().notEmpty().escape(),
    body('price').isFloat({ min: 0 }),
    body('available').isBoolean(),
];

export const updateMenuValidator = [
    body('name').optional().trim().notEmpty().escape(),
    body('price').optional().isFloat({ min: 0 }),
    body('available').optional().isBoolean(),
];
