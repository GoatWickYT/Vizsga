import { Router } from 'express';
import { updateCount } from '../../middleware/updateCounts.js';
import {
    createBuffetValidator,
    updateBuffetValidator,
} from '../../middleware/validation/map/buffetValidator.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { validateId } from '../../middleware/validation/validateId.js';
import * as BuffetController from '../../controllers/map/buffetController.js';

const router = Router();

/**
 * @openapi
 * /buffets:
 *   get:
 *     summary: Get all buffets
 *     tags:
 *       - Map / Buffets
 *     responses:
 *       200:
 *         description: List of buffets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Buffet'
 */

/**
 * @openapi
 * /buffets/{id}:
 *   get:
 *     summary: Get a single buffet by ID
 *     tags:
 *       - Map / Buffets
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The buffet ID
 *     responses:
 *       200:
 *         description: Single buffet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Buffet'
 */

/**
 * @openapi
 * /buffets:
 *   post:
 *     summary: Create a new buffet
 *     tags:
 *       - Map / Buffets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuffetInput'
 *     responses:
 *       201:
 *         description: buffet created
 */

/**
 * @openapi
 * /buffets/{id}:
 *   patch:
 *     summary: Update a buffet
 *     tags:
 *       - Map / Buffets
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The buffet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuffetInput'
 *     responses:
 *       200:
 *         description: buffet updated
 */

/**
 * @openapi
 * /buffets/{id}:
 *   delete:
 *     summary: Delete a buffet
 *     tags:
 *       - Map / Buffets
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The buffet ID
 *     responses:
 *       204:
 *         description: buffet deleted
 */
router.get('/', BuffetController.getBuffets);
router.get('/:id', validateId, BuffetController.getBuffet);
router.post(
    '/',
    createBuffetValidator,
    validateRequest,
    BuffetController.createBuffet,
    updateCount('map'),
);
router.patch(
    '/:id',
    updateBuffetValidator,
    validateRequest,
    validateId,
    BuffetController.updateBuffet,
    updateCount('map'),
);
router.delete('/:id', validateId, BuffetController.deleteBuffet, updateCount('map'));

export default router;
