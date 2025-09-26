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
from '../models/postModel.js';
import { Request, Response } from 'express';
import {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    Post,
} 

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const addPost = async (req: Request, res: Response) => {
    try {
        const post: Post = req.body;
        await createPost(post);
        res.status(201).json({ message: 'Post created' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getPost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const post = await getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
export const updatePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const post: Post = req.body;
        const updated = await updatePost(id, post);
        if (!updated) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post updated' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }           
};
export const removePost = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await deletePost(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}; 