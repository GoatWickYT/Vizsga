import * as personController from '../../controllers/ticket/personController.js';
import { Router } from 'express';

import {
    createPersonValidator,
    updatePersonValidator,
} from '../../middleware/validation/ticket/personValidator.js';
import { validateId } from '../../middleware/validation/validateId.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { authorizeRoles } from '../../middleware/auth/authorizeRoles.js';
import { attachUser } from '../../middleware/auth/attachUser.js';
import { Roles } from '../../types/roles.js';

const router = Router();

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
 * /people/id/{id}:
 *   get:
 *     summary: Get a single person by ID
 *     tags:
 *       - Ticket / People
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
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
 * /people/name/{name}:
 *   get:
 *     summary: Get a single person by Username
 *     tags:
 *       - Ticket / People
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The person Username
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
 * /people/email/{email}:
 *   get:
 *     summary: Get a single person by Email
 *     tags:
 *       - Ticket / People
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The person Email
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

router.use(attachUser, authorizeRoles(Roles.Admin, Roles.Owner));

router.get('/', personController.getPeople);
router.get('/id/:id', validateId, personController.getPerson);
router.get('/name/:name', validateId, personController.getPersonWithName);
router.get('/email/:email', validateId, personController.getPersonWithEmail);
router.post('/', createPersonValidator, validateRequest, personController.addPeople);
router.patch(
    '/:id',
    updatePersonValidator,
    validateRequest,
    validateId,
    personController.updatePeople,
);
router.delete('/:id', validateId, personController.deletePeople);

export default router;
