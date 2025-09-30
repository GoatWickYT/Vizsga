import { Router } from 'express';
import {
    createSpotValidator,
    updateSpotValidator,
} from '../../middleware/validation/map/spotValidator.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { validateId } from '../../middleware/validation/validateId.js';
import * as SpotController from '../../controllers/map/spotController.js';

const router = Router();

/**
 * @openapi
 * /spots:
 *   get:
 *     summary: Get all spots
 *     tags:
 *       - Map / Spots
 *     responses:
 *       200:
 *         description: List of spots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Spot'
 */

/**
 * @openapi
 * /spots/{id}:
 *   get:
 *     summary: Get a single spot by ID
 *     tags:
 *       - Map / Spots
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The spot ID
 *     responses:
 *       200:
 *         description: Single spot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Spot'
 */

/**
 * @openapi
 * /spots:
 *   post:
 *     summary: Create a new spot
 *     tags:
 *       - Map / Spots
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpotInput'
 *     responses:
 *       201:
 *         description: spot created
 */

/**
 * @openapi
 * /spots/{id}:
 *   patch:
 *     summary: Update a spot
 *     tags:
 *       - Map / Spots
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The spot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpotInput'
 *     responses:
 *       200:
 *         description: spot updated
 */

/**
 * @openapi
 * /spots/{id}:
 *   delete:
 *     summary: Delete a spot
 *     tags:
 *       - Map / Spots
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The spot ID
 *     responses:
 *       204:
 *         description: spot deleted
 */
router.get('/', SpotController.getSpots);
router.get('/:id', validateId, SpotController.getSpot);
router.post('/', createSpotValidator, validateRequest, SpotController.createSpot);
router.patch('/:id', updateSpotValidator, validateRequest, validateId, SpotController.updateSpot);
router.delete('/:id', validateId, SpotController.deleteSpot);

export default router;
