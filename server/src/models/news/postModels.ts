import { queryExec, queryRows } from '../util/queryHelper.js';

export interface Post {
    id?: number;
    name: string;
    description: string;
    important: boolean;
    likeCount: number;
    dislikeCount: number;
    views: number;
    date: Date;
}
export const getAllPosts = async (): Promise<Post[]> => {
    return await queryRows<Post>('SELECT * FROM posts');
};

export const getPostById = async (id: number): Promise<Post | null> => {
    const rows = await queryRows<Post>('SELECT * FROM posts WHERE id = ?', [id]);
    return rows[0] || null;
};

export const getPostByImportance = async (): Promise<Post[] | null> => {
    const rows = await queryRows<Post>('SELECT * FROM posts WHERE important = true');
    return rows || null;
};

export const createPost = async (Post: Post): Promise<number> => {
    const result = await queryExec('INSERT INTO posts (name, description, date) VALUES (?, ?, ?)', [
        Post.name,
        Post.description,
        Post.date,
    ]);
    return result.insertId;
};

export const updatePost = async (id: number, Post: Partial<Post>): Promise<boolean> => {
    const result = await queryExec('UPDATE posts SET name = ?, description = ? WHERE id = ?', [
        Post.name,
        Post.description,
        id,
    ]);
    return result.affectedRows > 0;
};

export const setStatistics = async (
    views: number,
    likes: number,
    dislikes: number,
    id: number,
): Promise<boolean> => {
    const result = await queryExec(
        'UPDATE posts SET views = ?, likes = ?, dislikes = ? WHERE id = ?',
        [views, likes, dislikes, id],
    );
    return result.affectedRows > 0;
};

export const setImportance = async (id: number, state: boolean) => {
    const result = await queryExec('UPDATE posts SET important = ? WHERE id = ?', [state, id]);
    return result.affectedRows > 0;
};

export const deletePost = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
