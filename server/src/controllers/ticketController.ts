import { Request, Response } from 'express';
import * as ticketModel from '../models/ticketModel.js';

export const getTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await ticketModel.getAllTickets();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const addTicket = async (req: Request, res: Response) => {
    try {
        const ticket: ticketModel.Ticket = req.body;
        await ticketModel.createTicket(ticket);
        res.status(201).json({ message: 'Ticket created' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getTicket = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const ticket = await ticketModel.getTicketById(id);
        if (ticket) {
            res.json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const updateTicket = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const ticket: ticketModel.Ticket = req.body;
        await ticketModel.updateTicket(id, ticket);
        res.json({ message: 'Ticket updated' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const deleteTicket = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10); 
        await ticketModel.deleteTicket(id);
        res.json({ message: 'Ticket deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};