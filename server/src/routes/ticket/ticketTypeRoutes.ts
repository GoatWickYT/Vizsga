import { Router } from 'express';
import { validateId } from '../../middleware/validateId.js';
import * as ticketTypeController from '../../controllers/ticket/ticketTypeController.js';

const ticketTypeRouter = Router();

/**
 * @openapi
 * /ticket-types:
 *   get:
 *     summary: Get all ticketTypes
 *     tags:
 *       - Ticket / TicketTypes
 *     responses:
 *       200:
 *         description: List of ticketTypes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketType'
 */

/**
 * @openapi
 * /ticket-types/{id}:
 *   get:
 *     summary: Get a single ticketType by ID
 *     tags:
 *       - Ticket / TicketTypes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticketType ID
 *     responses:
 *       200:
 *         description: Single ticketType
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
 */

/**
 * @openapi
 * /ticket-types:
 *   post:
 *     summary: Create a new ticketType
 *     tags:
 *       - Ticket / TicketTypes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketTypeInput'
 *     responses:
 *       201:
 *         description: ticketType created
 */

/**
 * @openapi
 * /ticket-types/{id}:
 *   patch:
 *     summary: Update a ticketType
 *     tags:
 *       - Ticket / TicketTypes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticketType ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketTypeInput'
 *     responses:
 *       200:
 *         description: ticketType updated
 */

/**
 * @openapi
 * /ticket-types/{id}:
 *   delete:
 *     summary: Delete a ticketType
 *     tags:
 *       - Ticket / TicketTypes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticketType ID
 *     responses:
 *       204:
 *         description: ticketType deleted
 */
ticketTypeRouter.get('/ticket-types', ticketTypeController.getTicketTypes);
ticketTypeRouter.post('/ticket-types', ticketTypeController.addTicketType);
ticketTypeRouter.get('/ticket-types/:id', validateId, ticketTypeController.getTicketType);
ticketTypeRouter.patch('/ticket-types/:id', validateId, ticketTypeController.updateTicketType);
ticketTypeRouter.delete('/ticket-types/:id', validateId, ticketTypeController.deleteTicketType);

export default ticketTypeRouter;
