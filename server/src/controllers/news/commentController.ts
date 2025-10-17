import { NextFunction, Request, Response } from 'express';
import * as CommentService from '../../models/news/commentModel.js';

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments: CommentService.Comment[] = await CommentService.getAllComments();
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
};

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const comment: CommentService.Comment | null = await CommentService.getCommentById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (err) {
        next(err);
    }
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment: CommentService.Comment = req.body;
        const insertId: number = await CommentService.createComment(comment);
        res.status(201).json({ message: 'Comment created', id: insertId });
    } catch (err) {
        next(err);
    }
};

export const updateComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const comment: CommentService.Comment = req.body;
        const updated: boolean = await CommentService.updateComment(id, comment);
        if (!updated) return res.status(404).json({ error: 'Comment not found or not updated' });
        res.status(200).json({ message: 'Comment updated' });
    } catch (err) {
        next(err);
    }
};
export const removeComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const deleted: boolean = await CommentService.deleteComment(id);
        if (!deleted) return res.status(404).json({ error: 'Comment not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
