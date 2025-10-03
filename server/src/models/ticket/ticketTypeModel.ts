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

export const updateTicketType = async (
    id: number,
    ticketType: Partial<TicketType>,
): Promise<boolean> => {
    const fields: string[] = [];
    const values: (string | number | boolean | null)[] = [];

    if (ticketType.name !== undefined) {
        fields.push('name = ?');
        values.push(ticketType.name);
    }
    if (ticketType.price !== undefined) {
        fields.push('price = ?');
        values.push(ticketType.price);
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE ticket_types SET ${fields.join(', ')} WHERE id = ?`;
    const result = await queryExec(query, values);
    return result.affectedRows > 0;
};

export const deleteTicketType = async (id: number): Promise<boolean> => {
    const result = await queryExec('DELETE FROM ticket_types WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
