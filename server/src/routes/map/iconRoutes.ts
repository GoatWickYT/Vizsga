import { Router } from 'express';
import {
    createIconValidator,
    updateIconValidator,
} from '../../middleware/validation/map/iconValidator.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { validateId } from '../../middleware/validation/validateId.js';
import * as IconController from '../../controllers/map/iconController.js';

const router = Router();

/**
 * @openapi
 * /icons:
 *   get:
 *     summary: Get all Icons
 *     tags:
 *       - Map / Icons
 *     responses:
 *       200:
 *         description: List of icons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Icon'
 */

/**
 * @openapi
 * /icons/{id}:
 *   get:
 *     summary: Get a single icon by ID
 *     tags:
 *       - Map / Icons
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The icon ID
 *     responses:
 *       200:
 *         description: Single Icon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Icon'
 */

/**
 * @openapi
 * /icons:
 *   post:
 *     summary: Create a new icon
 *     tags:
 *       - Map / Icons
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IconInput'
 *     responses:
 *       201:
 *         description: Icon created
 */

/**
 * @openapi
 * /icons/{id}:
 *   patch:
 *     summary: Update an icon
 *     tags:
 *       - Map / Icons
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Icon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IconInput'
 *     responses:
 *       200:
 *         description: Icon updated
 */

/**
 * @openapi
 * /icons/{id}:
 *   delete:
 *     summary: Delete an Icon
 *     tags:
 *       - Map / Icons
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The icon ID
 *     responses:
 *       204:
 *         description: Icon deleted
 */
router.get('/', IconController.getBuffets);
router.get('/:id', validateId, IconController.getBuffet);
router.post('/', createIconValidator, validateRequest, IconController.createBuffet);
router.patch('/:id', updateIconValidator, validateRequest, validateId, IconController.updateBuffet);
router.delete('/:id', validateId, IconController.deleteBuffet);

export default router;
