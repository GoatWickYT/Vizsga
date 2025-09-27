import { Router } from 'express';
import { validateId } from '../../middleware/validateId.js';
import * as personController from '../../controllers/ticket/personController.js';

const personRouter = Router();

/**
 * @openapi
 * /people:
 *   get:
 *     summary: Get all people
 *     tags:
 *       - Ticket / People
 *     responses:
 *       200:
 *         description: List of people
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 */

/**
 * @openapi
 * /people/{id}:
 *   get:
 *     summary: Get a single person by ID
 *     tags:
 *       - Ticket / People
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The person ID
 *     responses:
 *       200:
 *         description: Single person
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 */

/**
 * @openapi
 * /people:
 *   post:
 *     summary: Create a new people
 *     tags:
 *       - Ticket / People
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonInput'
 *     responses:
 *       201:
 *         description: people created
 */

/**
 * @openapi
 * /people/{id}:
 *   patch:
 *     summary: Update a people
 *     tags:
 *       - Ticket / People
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The people ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonInput'
 *     responses:
 *       200:
 *         description: people updated
 */

/**
 * @openapi
 * /people/{id}:
 *   delete:
 *     summary: Delete a people
 *     tags:
 *       - Ticket / People
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The people ID
 *     responses:
 *       204:
 *         description: people deleted
 */
personRouter.get('/', personController.getPeople);
personRouter.post('/', personController.addPeople);
personRouter.get('/:id', validateId, personController.getPerson);
personRouter.patch('/:id', validateId, personController.updatePeople);
personRouter.delete('/:id', validateId, personController.deletePeople);

export default personRouter;
