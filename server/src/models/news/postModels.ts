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
    const fields: string[] = [];
    const values: (string | number | boolean | null)[] = [];

    if (Post.name !== undefined) {
        fields.push('name = ?');
        values.push(Post.name);
    }
    if (Post.description !== undefined) {
        fields.push('description = ?');
        values.push(Post.description);
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`;
    const result = await queryExec(query, values);
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
