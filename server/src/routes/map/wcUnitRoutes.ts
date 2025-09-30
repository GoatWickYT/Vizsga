import { Router } from 'express';
import { updateCount } from '../../middleware/updateCounts.js';
import {
    createWcUnitValidator,
    updateWcUnitValidator,
} from '../../middleware/validation/map/wcUnitValidator.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { validateId } from '../../middleware/validation/validateId.js';
import * as WcUnitController from '../../controllers/map/wcUnitController.js';

const router = Router();

/**
 * @openapi
 * /wc-units:
 *   get:
 *     summary: Get all wcUnits
 *     tags:
 *       - Map / WcUnits
 *     responses:
 *       200:
 *         description: List of wcUnits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WcUnit'
 */

/**
 * @openapi
 * /wc-units/{id}:
 *   get:
 *     summary: Get a single wcUnit by ID
 *     tags:
 *       - Map / WcUnits
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The wcUnit ID
 *     responses:
 *       200:
 *         description: Single wcUnit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WcUnit'
 */

/**
 * @openapi
 * /wc-units:
 *   post:
 *     summary: Create a new wcUnit
 *     tags:
 *       - Map / WcUnits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WcUnitInput'
 *     responses:
 *       201:
 *         description: wcUnit created
 */

/**
 * @openapi
 * /wc-units/{id}:
 *   patch:
 *     summary: Update a wcUnit
 *     tags:
 *       - Map / WcUnits
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The wcUnit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WcUnitInput'
 *     responses:
 *       200:
 *         description: wcUnit updated
 */

/**
 * @openapi
 * /wc-units/{id}:
 *   delete:
 *     summary: Delete a wcUnit
 *     tags:
 *       - Map / WcUnits
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The wcUnit ID
 *     responses:
 *       204:
 *         description: wcUnit deleted
 */
router.get('/', WcUnitController.getWcUnits);
router.get('/:id', validateId, WcUnitController.getWcUnit);
router.post(
    '/',
    createWcUnitValidator,
    validateRequest,
    WcUnitController.createWcUnit,
    updateCount('map'),
);
router.patch(
    '/:id',
    updateWcUnitValidator,
    validateRequest,
    validateId,
    WcUnitController.updateWcUnit,
    updateCount('map'),
);
router.delete('/:id', validateId, WcUnitController.deleteWcUnit, updateCount('map'));

export default router;
