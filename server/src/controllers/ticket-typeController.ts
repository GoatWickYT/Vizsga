import { Request, Response } from 'express';
import * as ticketModel from '../models/ticket-typeModel.js';

export const getTicketTypes = async (req: Request, res: Response) => {
    try {
        const ticketTypes = await ticketModel.getAllTicketTypes();
        res.json(ticketTypes);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const addTicketType = async (req: Request, res: Response) => {
    try {
        const ticketType: ticketModel.TicketType = req.body;
        await ticketModel.createTicketType(ticketType);
        res.status(201).json({ message: 'Ticket type created' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getTicketType = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const ticketType = await ticketModel.getTicketTypeById(id);
        if (ticketType) {
            res.json(ticketType);
        } else {
            res.status(404).json({ message: 'Ticket type not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const updateTicketType = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const ticketType: ticketModel.TicketType = req.body;
        await ticketModel.updateTicketType(id, ticketType);
        res.json({ message: 'Ticket type updated' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const deleteTicketType = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        await ticketModel.deleteTicketType(id);
        res.json({ message: 'Ticket type deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
