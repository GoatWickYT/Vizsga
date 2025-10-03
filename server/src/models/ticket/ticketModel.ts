import { queryExec, queryRows } from '../util/queryHelper.js';

export interface Ticket {
    id?: number;
    amount: number;
    typeId?: number;
    userId?: number;
}

export const getAllTickets = async (): Promise<Ticket[]> => {
    const rows = await queryRows<Ticket>('SELECT * FROM tickets');
    return rows;
};

export const createTicket = async (ticket: Ticket): Promise<number> => {
    const result = await queryExec(
        'INSERT INTO tickets (amount, type_id, user_id) VALUES (?, ?, ?, ?)',
        [ticket.amount, ticket.typeId, ticket.userId],
    );
    return result.insertId;
};

export const getTicketById = async (id: number): Promise<Ticket | null> => {
    const rows = await queryRows<Ticket>('SELECT * FROM tickets WHERE id = ?', [id]);
    return rows[0] || null;
};

export const getMyTicket = async (id: number): Promise<Ticket[] | null> => {
    const rows = await queryRows<Ticket>('SELECT * FROM tickets WHERE user_id = ?', [id]);
    return rows || null;
};

export const setTicket = async (id: number, ticket: Partial<Ticket>): Promise<boolean> => {
    const fields: string[] = [];
    const values: (string | number | boolean | null)[] = [];

    if (ticket.amount !== undefined) {
        fields.push('amount = ?');
        values.push(ticket.amount);
    }
    if (ticket.typeId !== undefined) {
        fields.push('type_id = ?');
        values.push(ticket.typeId);
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE tickets SET ${fields.join(', ')} WHERE id = ?`;
    const result = await queryExec(query, values);
    return result.affectedRows > 0;
};

export const removeTicket = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM tickets WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
