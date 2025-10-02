import { body } from 'express-validator';

export const createTicketValidator = [
    body('name').trim().notEmpty().escape(),
    body('amount').isInt({ min: 1 }),
    body('typeId').isInt({ min: 1 }),
    body('userId').isInt({ min: 1 }),
];

export const updateTicketValidator = [
    body('name').optional().trim().notEmpty().escape(),
    body('amount').optional().isInt({ min: 1 }),
    body('typeId').optional().isInt({ min: 1 }),
];
