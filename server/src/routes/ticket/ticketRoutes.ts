import * as ticketController from '../../controllers/ticket/ticketController.js';
import { Router } from 'express';

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
 *         description: Ticket created
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
 *           type: number
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
 *         description: Ticket updated
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
 *           type: number
 *         required: true
 *         description: The ticket ID
 *     responses:
 *       204:
 *         description: Ticket deleted
 */

/**
 * @openapi
 * /tickets/my:
 *   get:
 *     summary: Get tickets of the logged-in user
 *     tags:
 *       - Ticket / Tickets
 *     security:
 *       - bearerAuth: []   # Indicates this endpoint requires a JWT or similar auth
 *     responses:
 *       200:
 *         description: List of tickets belonging to the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Unauthorized – user must be logged in
 */

router.use(attachUser, authorizeRoles(Roles.User, Roles.Admin, Roles.Owner));

router.get('/my', ticketController.getMyTickets);

router.use(attachUser, authorizeRoles(Roles.Admin, Roles.Owner));

router.get('/', ticketController.getTickets);
router.get('/id/:id', validateId, ticketController.getTicket);
router.post('/', createTicketValidator, validateRequest, ticketController.addTicket);
router.patch(
    '/:id',
    updateTicketValidator,
    validateRequest,
    validateId,
    ticketController.updateTicket,
);
router.delete('/:id', validateId, ticketController.deleteTicket);

export default router;
