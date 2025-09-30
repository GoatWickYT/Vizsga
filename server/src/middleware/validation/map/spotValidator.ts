import { body } from 'express-validator';

export const createSpotValidator = [
    body('name').trim().notEmpty().escape(),
    body('locationX').isNumeric(),
    body('locationY').isNumeric(),
];

export const updateSpotValidator = [
    body('name').optional().trim().notEmpty().escape(),
    body('locationX').optional().isNumeric(),
    body('locationY').optional().isNumeric(),
];
