import { Router } from 'express';
import { updateCount } from '../../middleware/updateCounts.js';
import {
    createTicketValidator,
    updateTicketValidator,
} from '../../middleware/validation/ticket/ticketValidator.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { validateId } from '../../middleware/validation/validateId.js';
import * as ticketController from '../../controllers/ticket/ticketController.js';

const ticketRouter = Router();

/**
 * @openapi
 * /tickets:
 *   get:
 *     summary: Get all tickets
 *     tags:
 *       - Ticket / Tickets
 *     responses:
 *       200:
 *         description: List of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */

/**
 * @openapi
 * /tickets/{id}:
 *   get:
 *     summary: Get a single ticket by ID
 *     tags:
 *       - Ticket / Tickets
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Single ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 */

/**
 * @openapi
 * /tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags:
 *       - Ticket / Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketInput'
 *     responses:
 *       201:
 *         description: ticket created
 */

/**
 * @openapi
 * /tickets/{id}:
 *   patch:
 *     summary: Update a ticket
 *     tags:
 *       - Ticket / Tickets
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketInput'
 *     responses:
 *       200:
 *         description: ticket updated
 */

/**
 * @openapi
 * /tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     tags:
 *       - Ticket / Tickets
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket ID
 *     responses:
 *       204:
 *         description: ticket deleted
 */
ticketRouter.get('/', ticketController.getTickets);
ticketRouter.get('/:id', validateId, ticketController.getTicket);
ticketRouter.post(
    '/',
    createTicketValidator,
    validateRequest,
    ticketController.addTicket,
    updateCount('ticket'),
);
ticketRouter.patch(
    '/:id',
    updateTicketValidator,
    validateRequest,
    validateId,
    ticketController.updateTicket,
    updateCount('ticket'),
);
ticketRouter.delete('/:id', validateId, ticketController.deleteTicket, updateCount('ticket'));

export default ticketRouter;
