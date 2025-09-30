import { body } from 'express-validator';

export const createCommentValidator = [
    body('content').trim().notEmpty().escape(),
    body('date').isISO8601().withMessage('Invalid date format'),
    body('userId').isInt({ min: 1 }),
    body('postId').isInt({ min: 1 }),
];

export const updateCommentValidator = [
    body('content').optional().trim().notEmpty().escape(),
    body('date').optional().isISO8601(),
    body('userId').optional().isInt({ min: 1 }),
    body('postId').optional().isInt({ min: 1 }),
];
