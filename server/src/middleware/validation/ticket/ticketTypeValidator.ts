import { body } from 'express-validator';

export const createTicketTypeValidator = [
    body('name').trim().notEmpty().escape(),
    body('price').isFloat({ min: 0 }),
];

export const updateTicketTypeValidator = [
    body('name').optional().trim().notEmpty().escape(),
    body('price').optional().isFloat({ min: 0 }),
];
