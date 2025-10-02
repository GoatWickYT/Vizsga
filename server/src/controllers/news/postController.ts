import { NextFunction, Request, Response } from 'express';
import {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    setImportance,
    setStatistics,
    getPostByImportance,
    Post,
} from '../../models/news/postModels.js';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

export const addPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post: Post = req.body;
        await createPost(post);
        res.status(201).json({ message: 'Post created' });
    } catch (err) {
        next(err);
    }
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const post = await getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};
export const getImportantPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await getPostByImportance();
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};
export const updatePosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const post: Post = req.body;
        await updatePost(id, post);
        res.status(200).json({ message: 'Post updated' });
    } catch (err) {
        next(err);
    }
};
export const updateStatistics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const post: Post = req.body;
        await setStatistics(post.views, post.likeCount, post.dislikeCount, id);
        res.status(200).json({ message: 'Statistics updated' });
    } catch (err) {
        next(err);
    }
};
export const changeImportance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const state = Boolean(req.body);
        await setImportance(id, state);
        res.status(200).json({ message: 'Importance state updated' });
    } catch (err) {
        next(err);
    }
};
export const removePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await deletePost(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
