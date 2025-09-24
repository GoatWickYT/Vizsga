import db from '../config/db.js';

export interface TicketType {
    id?: number;
    UserName: string;
    Price: number;
}

export async function getAllTicketTypes(): Promise<TicketType[]> {
    const [rows] = await db.query('SELECT * FROM TicketType');
    return rows as TicketType[];
}

export async function createTicketType(ticketType: TicketType): Promise<void> {
    await db.query('INSERT INTO TicketType (UserName, Price) VALUES (?, ?)', [ticketType.UserName, ticketType.Price]);
}

export async function getTicketTypeById(id: number): Promise<TicketType | null> {
    const [rows] = await db.query('SELECT * FROM TicketType WHERE id = ?', [id]);
    const ticketTypes = rows as TicketType[];
    return ticketTypes.length > 0 ? ticketTypes[0] : null;
}

export async function updateTicketType(id: number, ticketType: TicketType): Promise<void> {
    await db.query('UPDATE TicketType SET UserName = ?, Price = ? WHERE id = ?', [ticketType.UserName, ticketType.Price, id]);
}   

export async function deleteTicketType(id: number): Promise<void> {
    await db.query('DELETE FROM TicketType WHERE id = ?', [id]);
}
