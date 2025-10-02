import { queryExec, queryRows } from '../util/queryHelper.js';

export interface Ticket {
    id?: number;
    name: string;
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
        'INSERT INTO tickets (user_name, amount, type_id, user_id) VALUES (?, ?, ?, ?)',
        [ticket.name, ticket.amount, ticket.typeId, ticket.userId],
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

export const setTicket = async (id: number, ticket: Ticket): Promise<boolean> => {
    const result = await queryExec(
        'UPDATE tickets SET user_name = ?, amount = ?, type_id = ? WHERE id = ?',
        [ticket.name, ticket.amount, ticket.typeId, id],
    );
    return result.affectedRows > 0;
};

export const removeTicket = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM tickets WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
