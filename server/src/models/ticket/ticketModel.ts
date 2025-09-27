import db from '../../config/db.js';

export interface Ticket {
    id?: number;
    name: string;
    amount: number;
    typeId?: number;
}

export const getAllTickets = async (): Promise<Ticket[]> => {
    const [rows] = await db.query('SELECT * FROM tickets');
    return rows as Ticket[];
};

export const createTicket = async (ticket: Ticket): Promise<void> => {
    await db.query('INSERT INTO tickets (user_name, amount, type_id) VALUES (?, ?, ?)', [
        ticket.name,
        ticket.amount,
        ticket.typeId,
    ]);
};

export const getTicketById = async (id: number): Promise<Ticket | null> => {
    const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
    const tickets = rows as Ticket[];
    return tickets.length > 0 ? tickets[0] : null;
};

export const updateTicket = async (id: number, ticket: Ticket): Promise<void> => {
    await db.query('UPDATE tickets SET user_name = ?, amount = ?, type_id = ? WHERE id = ?', [
        ticket.name,
        ticket.amount,
        ticket.typeId,
        id,
    ]);
};

export const deleteTicket = async (id: number): Promise<void> => {
    await db.query('DELETE FROM tickets WHERE id = ?', [id]);
};
