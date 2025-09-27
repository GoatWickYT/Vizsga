import { Request, Response, NextFunction } from 'express';
import * as ticketModel from '../../models/ticket/ticketTypeModel.js';

export const getTicketTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticketTypes = await ticketModel.getAllTicketTypes();
        res.status(200).json(ticketTypes);
    } catch (err) {
        next(err);
    }
};

export const addTicketType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticketType: ticketModel.TicketType = req.body;
        await ticketModel.createTicketType(ticketType);
        res.status(201).json({ message: 'Ticket type created' });
    } catch (err) {
        next(err);
    }
};

export const getTicketType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const ticketType = await ticketModel.getTicketTypeById(id);
        if (ticketType) {
            res.status(200).json(ticketType);
        } else {
            res.status(404).json({ message: 'Ticket type not found' });
        }
    } catch (err) {
        next(err);
    }
};

export const updateTicketType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const ticketType: ticketModel.TicketType = req.body;
        await ticketModel.updateTicketType(id, ticketType);
        res.status(200).json({ message: 'Ticket type updated' });
    } catch (err) {
        next(err);
    }
};

export const deleteTicketType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await ticketModel.deleteTicketType(id);
        res.status(200).json({ message: 'Ticket type deleted' });
    } catch (err) {
        next(err);
    }
};
