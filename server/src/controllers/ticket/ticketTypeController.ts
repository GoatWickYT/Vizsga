import { Request, Response, NextFunction } from 'express';
import * as ticketService from '../../models/ticket/ticketTypeModel.js';

export const getTicketTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticketTypes = await ticketService.getAllTicketTypes();
        res.status(200).json(ticketTypes);
    } catch (err) {
        next(err);
    }
};

export const addTicketType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticketType: ticketService.TicketType = req.body;
        const insertId: number = await ticketService.createTicketType(ticketType);
        res.status(201).json({ message: 'Ticket type created', id: insertId });
    } catch (err) {
        next(err);
    }
};

export const getTicketType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const ticketType: ticketService.TicketType | null = await ticketService.getTicketTypeById(
            id,
        );
        if (ticketType) return res.status(200).json(ticketType);

        res.status(404).json({ error: 'Ticket type not found' });
    } catch (err) {
        next(err);
    }
};

export const updateTicketType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const ticketType: ticketService.TicketType = req.body;
        const updated: boolean = await ticketService.updateTicketType(id, ticketType);
        if (!updated)
            return res.status(404).json({ error: 'Ticket Type not found or not updated' });
        res.status(200).json({ message: 'Ticket type updated' });
    } catch (err) {
        next(err);
    }
};

export const deleteTicketType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const deleted: boolean = await ticketService.deleteTicketType(id);
        if (!deleted)
            return res.status(404).json({ error: 'Ticket Type not found or not deleted' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
