import { body } from 'express-validator';

export const createPostValidator = [
    body('name').trim().notEmpty().escape(),
    body('date').isISO8601(),
    body('description').trim().notEmpty().escape(),
];

export const updatePostValidator = [
    body('name').optional().trim().notEmpty().escape(),
    body('date').optional().isISO8601(),
    body('description').optional().trim().notEmpty().escape(),
];
