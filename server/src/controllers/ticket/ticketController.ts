import { NextFunction, Request, Response } from 'express';
import * as TicketService from '../../models/ticket/ticketModel.js';

export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tickets: TicketService.Ticket[] = await TicketService.getAllTickets();
        res.status(200).json(tickets);
    } catch (err) {
        next(err);
    }
};

export const getTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const ticket: TicketService.Ticket | null = await TicketService.getTicketById(id);
        if (ticket) return res.status(200).json(ticket);
        res.status(404).json({ error: 'Ticket not found' });
    } catch (err) {
        next(err);
    }
};

export const getMyTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = Number(req.user?.id);
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });
        const tickets: TicketService.Ticket[] | null = await TicketService.getMyTicket(userId);
        res.status(200).json(tickets);
    } catch (err) {
        next(err);
    }
};

export const addTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticket: TicketService.Ticket = req.body;
        const insertId: number = await TicketService.createTicket(ticket);
        res.status(201).json({ message: 'Ticket created', id: insertId });
    } catch (err) {
        next(err);
    }
};

export const updateTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const ticket: TicketService.Ticket = req.body;
        const updated: boolean = await TicketService.setTicket(id, ticket);
        if (!updated) return res.status(404).json({ error: 'Ticket not found or not updated' });
        res.status(200).json({ message: 'Ticket updated' });
    } catch (err) {
        next(err);
    }
};

export const deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const deleted: boolean = await TicketService.removeTicket(id);
        if (!deleted) return res.status(404).json({ error: 'Ticket not found or not deleted' });
        res.status(200).json({ message: 'Ticket deleted' });
    } catch (err) {
        next(err);
    }
};
