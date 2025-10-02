import { queryExec, queryRows } from '../util/queryHelper.js';

export interface TicketType {
    id?: number;
    name: string;
    price: number;
}

export const getAllTicketTypes = async (): Promise<TicketType[]> => {
    return await queryRows<TicketType>('SELECT * FROM ticket_types');
};

export const createTicketType = async (ticketType: TicketType): Promise<number> => {
    const result = await queryExec('INSERT INTO ticket_types (name, price) VALUES (?, ?)', [
        ticketType.name,
        ticketType.price,
    ]);
    return result.insertId;
};

export const getTicketTypeById = async (id: number): Promise<TicketType | null> => {
    const rows = await queryRows<TicketType>('SELECT * FROM ticket_types WHERE id = ?', [id]);
    return rows[0] || null;
};

export const updateTicketType = async (id: number, ticketType: TicketType): Promise<boolean> => {
    const result = await queryExec('UPDATE ticket_types SET name = ?, price = ? WHERE id = ?', [
        ticketType.name,
        ticketType.price,
        id,
    ]);
    return result.affectedRows > 0;
};

export const deleteTicketType = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM ticket_types WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
