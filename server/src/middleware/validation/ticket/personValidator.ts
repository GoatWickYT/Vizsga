import { body } from 'express-validator';

export const createPersonValidator = [
    body('userName').trim().notEmpty().escape(),
    body('name').trim().notEmpty().escape(),
    body('phone').optional().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('creditCard').optional().trim().escape(),
    body('password').notEmpty().withMessage('Password is required'),
];

export const updatePersonValidator = [
    body('userName').optional().trim().notEmpty().escape(),
    body('name').optional().trim().notEmpty().escape(),
    body('phone').optional().trim().escape(),
    body('email').optional().isEmail().normalizeEmail(),
    body('creditCard').optional().trim().escape(),
    body('password').optional().notEmpty(),
];
