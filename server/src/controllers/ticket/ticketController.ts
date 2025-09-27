import { NextFunction, Request, Response } from 'express';
import * as ticketModel from '../../models/ticket/ticketModel.js';

export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tickets = await ticketModel.getAllTickets();
        res.status(200).json(tickets);
    } catch (err) {
        next(err);
    }
};

export const addTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticket: ticketModel.Ticket = req.body;
        await ticketModel.createTicket(ticket);
        res.status(201).json({ message: 'Ticket created' });
    } catch (err) {
        next(err);
    }
};

export const getTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const ticket = await ticketModel.getTicketById(id);
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (err) {
        next(err);
    }
};

export const updateTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const ticket: ticketModel.Ticket = req.body;
        await ticketModel.updateTicket(id, ticket);
        res.status(200).json({ message: 'Ticket updated' });
    } catch (err) {
        next(err);
    }
};

export const deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await ticketModel.deleteTicket(id);
        res.status(200).json({ message: 'Ticket deleted' });
    } catch (err) {
        next(err);
    }
};
