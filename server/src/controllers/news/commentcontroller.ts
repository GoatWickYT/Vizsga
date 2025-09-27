import { NextFunction, Request, Response } from 'express';
import {
    getAllComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
    Comment,
} from '../../models/news/commentModels.js';

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await getAllComments();
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment: Comment = req.body;
        await createComment(comment);
        res.status(201).json({ message: 'Comment created' });
    } catch (err) {
        next(err);
    }
};

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const comment = await getCommentById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (err) {
        next(err);
    }
};
export const updateComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const comment: Comment = req.body;
        await updateComment(id, comment);
        res.status(200).json({ message: 'Comment updated' });
    } catch (err) {
        next(err);
    }
};
export const removeComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await deleteComment(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
