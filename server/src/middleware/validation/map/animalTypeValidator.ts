import { body } from 'express-validator';

export const createAnimalTypeValidator = [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('animalId').isInt({ min: 1 }).withMessage('animalId must be a positive integer'),
];

export const updateAnimalTypeValidator = [
    body('name').optional().trim().notEmpty().escape(),
    body('animalId').optional().isInt({ min: 1 }),
];
