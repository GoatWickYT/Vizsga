import { NextFunction, Request, Response } from 'express';
import {
    getAllTickets,
    createTicket,
    removeTicket,
    getTicketById,
    getMyTicket,
    setTicket,
    Ticket,
} from '../../models/ticket/ticketModel.js';

export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tickets = await getAllTickets();
        res.status(200).json(tickets);
    } catch (err) {
        next(err);
    }
};

export const addTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticket: Ticket = req.body;
        await createTicket(ticket);
        res.status(201).json({ message: 'Ticket created' });
    } catch (err) {
        next(err);
    }
};

export const getTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const ticket = await getTicketById(id);
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (err) {
        next(err);
    }
};

export const getMyTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const tickets: Ticket[] | null = await getMyTicket(userId);
        res.status(200).json(tickets);
    } catch (err) {
        next(err);
    }
};

export const updateTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const ticket: Ticket = req.body;
        await setTicket(id, ticket);
        res.status(200).json({ message: 'Ticket updated' });
    } catch (err) {
        next(err);
    }
};

export const deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await removeTicket(id);
        res.status(200).json({ message: 'Ticket deleted' });
    } catch (err) {
        next(err);
    }
};
