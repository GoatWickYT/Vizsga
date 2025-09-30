import { body } from 'express-validator';

export const createStatusValidator = [
    body('name').trim().notEmpty().escape(),
    body('age').isInt({ min: 0 }),
    body('spotId').isInt({ min: 1 }),
];

export const updateStatusValidator = [
    body('name').optional().trim().notEmpty().escape(),
    body('age').optional().isInt({ min: 0 }),
    body('spotId').optional().isInt({ min: 1 }),
];
