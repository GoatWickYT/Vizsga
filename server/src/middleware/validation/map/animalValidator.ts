import { body } from 'express-validator';

export const createAnimalValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 100 })
        .withMessage('Name must be under 100 characters')
        .escape(),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 500 })
        .withMessage('Description must be under 500 characters')
        .escape(),

    body('adopter')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Adopter name must be under 100 characters')
        .escape(),

    body('type')
        .trim()
        .notEmpty()
        .withMessage('Type cannot be empty if provided')
        .isString()
        .isLength({ max: 50 }),

    body('spotId').optional().isInt({ min: 1 }).withMessage('spotId must be a positive integer'),
];

export const updateAnimalValidator = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Name cannot be empty if provided')
        .isLength({ max: 100 })
        .escape(),

    body('description')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Description cannot be empty if provided')
        .isLength({ max: 500 })
        .escape(),

    body('adopter').optional().trim().isLength({ max: 100 }).escape(),

    body('type')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Type cannot be empty if provided')
        .isString()
        .isLength({ max: 50 }),
];
