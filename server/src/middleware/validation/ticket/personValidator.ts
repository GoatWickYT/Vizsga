import { body } from 'express-validator';
import { Roles } from '../../../types/roles.js';

const allowedRoles = Object.values(Roles);

export const createPersonValidator = [
    body('username').trim().notEmpty().escape(),
    body('name').trim().notEmpty().escape(),
    body('phone').optional().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('creditCard').optional().trim().escape(),
    body('password').notEmpty().withMessage('Password is required'),
    body('role')
        .notEmpty()
        .isIn(allowedRoles)
        .withMessage(`Role must be one of: ${allowedRoles.join(', ')}`),
];

export const updatePersonValidator = [
    body('username').optional().trim().notEmpty().escape(),
    body('name').optional().trim().notEmpty().escape(),
    body('phone').optional().trim().escape(),
    body('email').optional().isEmail().normalizeEmail(),
    body('creditCard').optional().trim().escape(),
    body('password').optional().notEmpty(),
    body('role')
        .optional()
        .notEmpty()
        .isIn(allowedRoles)
        .withMessage(`Role must be one of: ${allowedRoles.join(', ')}`),
];
