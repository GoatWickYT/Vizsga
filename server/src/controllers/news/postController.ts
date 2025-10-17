import { NextFunction, Request, Response } from 'express';
import * as PostService from '../../models/news/postModel.js';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts: PostService.Post[] = await PostService.getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const post: PostService.Post | null = await PostService.getPostById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

export const getImportantPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post: PostService.Post[] | null = await PostService.getPostByImportance();
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

export const addPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post: PostService.Post = req.body;
        const insertId: number = await PostService.createPost(post);
        res.status(201).json({ message: 'Post created', id: insertId });
    } catch (err) {
        next(err);
    }
};

export const updatePosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const post: PostService.Post = req.body;
        const updated: boolean = await PostService.updatePost(id, post);
        if (!updated)
            return res.status(404).json({ error: 'Post not found or content not updated' });
        res.status(200).json({ message: 'Post updated' });
    } catch (err) {
        next(err);
    }
};

export const updateStatistics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const post: PostService.Post = req.body;
        const updated: boolean = await PostService.setStatistics(
            post.views,
            post.likeCount,
            post.dislikeCount,
            id,
        );
        if (!updated)
            return res.status(404).json({ error: 'Post not found or statistics not updated' });
        res.status(200).json({ message: 'Statistics updated' });
    } catch (err) {
        next(err);
    }
};

export const changeImportance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const state = Boolean(req.body);
        const updated: boolean = await PostService.setImportance(id, state);
        if (!updated)
            return res.status(404).json({ error: 'Post not found or importance not updated' });
        res.status(200).json({ message: 'Importance state updated' });
    } catch (err) {
        next(err);
    }
};

export const removePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const deleted: boolean = await PostService.deletePost(id);
        if (!deleted) return res.status(404).json({ error: 'Post not found or deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
