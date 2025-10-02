import db from '../../config/db.js';

export interface TicketType {
    id?: number;
    name: string;
    price: number;
}

export const getAllTicketTypes = async (): Promise<TicketType[]> => {
    const [rows] = await db.query('SELECT * FROM ticket_types');
    return rows as TicketType[];
};

export const createTicketType = async (ticketType: TicketType): Promise<void> => {
    await db.query('INSERT INTO ticket_types (name, price) VALUES (?, ?)', [
        ticketType.name,
        ticketType.price,
    ]);
};

export const getTicketTypeById = async (id: number): Promise<TicketType | null> => {
    const [rows] = await db.query('SELECT * FROM ticket_types WHERE id = ?', [id]);
    const ticketTypes = rows as TicketType[];
    return ticketTypes.length > 0 ? ticketTypes[0] : null;
};

export const updateTicketType = async (id: number, ticketType: TicketType): Promise<void> => {
    await db.query('UPDATE ticket_types SET name = ?, price = ? WHERE id = ?', [
        ticketType.name,
        ticketType.price,
        id,
    ]);
};

export const deleteTicketType = async (id: number): Promise<void> => {
    await db.query('DELETE FROM ticket_types WHERE id = ?', [id]);
};
