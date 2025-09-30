import { Router } from 'express';
import {
    createStatusValidator,
    updateStatusValidator,
} from '../../middleware/validation/map/statusValidator.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { validateId } from '../../middleware/validation/validateId.js';
import * as StatusController from '../../controllers/map/statusController.js';

const router = Router();

/**
 * @openapi
 * /status:
 *   get:
 *     summary: Get all status
 *     tags:
 *       - Map / Statuses
 *     responses:
 *       200:
 *         description: List of status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Status'
 */

/**
 * @openapi
 * /status/{id}:
 *   get:
 *     summary: Get a single status by ID
 *     tags:
 *       - Map / Statuses
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The status ID
 *     responses:
 *       200:
 *         description: Single status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 */

/**
 * @openapi
 * /status:
 *   post:
 *     summary: Create a new status
 *     tags:
 *       - Map / Statuses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatusInput'
 *     responses:
 *       201:
 *         description: status created
 */

/**
 * @openapi
 * /status/{id}:
 *   patch:
 *     summary: Update a status
 *     tags:
 *       - Map / Statuses
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The status ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatusInput'
 *     responses:
 *       200:
 *         description: status updated
 */

/**
 * @openapi
 * /status/{id}:
 *   delete:
 *     summary: Delete a status
 *     tags:
 *       - Map / Statuses
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The status ID
 *     responses:
 *       204:
 *         description: status deleted
 */
router.get('/', StatusController.getStatuses);
router.get('/:id', validateId, StatusController.getStatus);
router.post('/', createStatusValidator, validateRequest, StatusController.createStatus);
router.patch(
    '/:id',
    updateStatusValidator,
    validateRequest,
    validateId,
    StatusController.updateStatus,
);
router.delete('/:id', validateId, StatusController.deleteStatus);

export default router;
