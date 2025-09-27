import db from '../config/db.js';

export interface Ticket {
    id?: number;
    UserName: string;
    Amount: number;
    Type: string;
}

export async function getAllTickets(): Promise<Ticket[]> {
    const [rows] = await db.query('SELECT * FROM Ticket');
    return rows as Ticket[];
}

export async function createTicket(ticket: Ticket): Promise<void> {
    await db.query('INSERT INTO Ticket (UserName, Amount, Type) VALUES (?, ?, ?)', [ticket.UserName, ticket.Amount, ticket.Type]);
}

export async function getTicketById(id: number): Promise<Ticket | null> {
    const [rows] = await db.query('SELECT * FROM Ticket WHERE id = ?', [id]);
    const tickets = rows as Ticket[];
    return tickets.length > 0 ? tickets[0] : null;
}

export async function updateTicket(id: number, ticket: Ticket): Promise<void> {
    await db.query('UPDATE Ticket SET UserName = ?, Amount = ?, Type = ? WHERE id = ?', [ticket.UserName, ticket.Amount, ticket.Type, id]);
}   

export async function deleteTicket(id: number): Promise<void> {
    await db.query('DELETE FROM Ticket WHERE id = ?', [id]);
}
