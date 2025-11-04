import { queryExec, queryRows } from '../util/queryHelper.js';

export interface Comment {
    id?: number;
    content: string;
    date: Date;
    userId?: number;
    postId?: number;
}
export const getAllComments = async (): Promise<Comment[]> => {
    return await queryRows<Comment>('SELECT * FROM comments');
};

export const createComment = async (comment: Comment): Promise<number> => {
    const result = await queryExec(
        'INSERT INTO comments (content, date, user_id, post_id) VALUES (?, ?, ?, ?)',
        [comment.content, comment.date, comment.userId, comment.postId],
    );
    return result.insertId;
};

export const getCommentById = async (id: number): Promise<Comment | null> => {
    const rows = await queryRows<Comment>('SELECT * FROM comments WHERE id = ?', [id]);
    return rows[0] || null;
};

export const updateComment = async (id: number, comment: Comment): Promise<boolean> => {
    const result = await queryExec('UPDATE comments SET content = ? WHERE id = ?', [
        comment.content,
        id,
    ]);
    return result.affectedRows > 0;
};

export const deleteComment = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM comments WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
