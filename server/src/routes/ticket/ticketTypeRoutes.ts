import * as ticketTypeController from '../../controllers/ticket/ticketTypeController.js';
import { Router } from 'express';
import { updateCount } from '../../middleware/updateCounts.js';
import {
    createTicketTypeValidator,
    updateTicketTypeValidator,
} from '../../middleware/validation/ticket/ticketTypeValidator.js';
import { validateId } from '../../middleware/validation/validateId.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { authorizeRoles } from '../../middleware/auth/authorizeRoles.js';
import { attachUser } from '../../middleware/auth/attachUser.js';
import { Roles } from '../../types/roles.js';

const router = Router();

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
 *           type: number
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
router.get('/', ticketTypeController.getTicketTypes);
router.get('/:id', validateId, ticketTypeController.getTicketType);

router.use(attachUser, authorizeRoles(Roles.Admin, Roles.Owner));

router.post(
    '/',
    createTicketTypeValidator,
    validateRequest,
    ticketTypeController.addTicketType,
    updateCount('ticket'),
);
router.patch(
    '/:id',
    updateTicketTypeValidator,
    validateRequest,
    validateId,
    ticketTypeController.updateTicketType,
    updateCount('ticket'),
);
router.delete('/:id', validateId, ticketTypeController.deleteTicketType, updateCount('ticket'));

export default router;
