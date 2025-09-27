/*

//////////////////////////////////

Import models used by controllers from ../model/*.js always has to end with .js

//////////////////////////////////



import { Request, Response } from 'express';
import { getAllUsers, createUser, User } from '../models/userModel.js';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        await createUser(user);
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
*/

import { Request, Response } from 'express';
import {
    getAllComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
    Comment,
} from '../models/commentModels.js'
import { Post } from '../models/postModels.js';

export const getComments = async (req: Request, res: Response) => {
    try {
        const comments = await getAllComments();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const addComment = async (req: Request, res: Response) => {
    try {
        const comment: Comment = req.body;
        await createComment(comment);
        res.status(201).json({ message: 'Comment created' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getComment = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const comment = await getCommentById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
export const updateComments = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const comment: Comment = req.body;
       await updateComment(id, comment);
        res.json({ message: 'Comment updated' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }  
};
export const removeComment = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await deleteComment(id);
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}; 