import * as ticketController from '../../controllers/ticket/ticketController.js';
import { Router } from 'express';
import { updateCount } from '../../middleware/updateCounts.js';
import {
    createTicketValidator,
    updateTicketValidator,
} from '../../middleware/validation/ticket/ticketValidator.js';
import { validateId } from '../../middleware/validation/validateId.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { authorizeRoles } from '../../middleware/auth/authorizeRoles.js';
import { attachUser } from '../../middleware/auth/attachUser.js';
import { Roles } from '../../types/roles.js';

const router = Router();

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
 *           type: number
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

router.use(attachUser, authorizeRoles(Roles.Admin, Roles.Owner));

router.get('/', ticketController.getTickets);
router.get('/:id', validateId, ticketController.getTicket);
router.post(
    '/',
    createTicketValidator,
    validateRequest,
    ticketController.addTicket,
    updateCount('ticket'),
);
router.patch(
    '/:id',
    updateTicketValidator,
    validateRequest,
    validateId,
    ticketController.updateTicket,
    updateCount('ticket'),
);
router.delete('/:id', validateId, ticketController.deleteTicket, updateCount('ticket'));

export default router;
