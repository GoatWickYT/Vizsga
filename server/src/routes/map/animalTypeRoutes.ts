import { Router } from 'express';
import {
    createAnimalTypeValidator,
    updateAnimalTypeValidator,
} from '../../middleware/validation/map/animalTypeValidator.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { validateId } from '../../middleware/validation/validateId.js';
import * as AnimalTypeController from '../../controllers/map/animalTypeController.js';

const router = Router();

/**
 * @openapi
 * /animal-types:
 *   get:
 *     summary: Get all animalTypes
 *     tags:
 *       - Map / AnimalTypes
 *     responses:
 *       200:
 *         description: List of animalTypes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AnimalType'
 */

/**
 * @openapi
 * /animal-types/{id}:
 *   get:
 *     summary: Get a single animalType by ID
 *     tags:
 *       -  Map / AnimalTypes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The animalType ID
 *     responses:
 *       200:
 *         description: Single animalType
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnimalType'
 */

/**
 * @openapi
 * /animal-types:
 *   post:
 *     summary: Create a new animalType
 *     tags:
 *       -  Map / AnimalTypes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnimalTypeInput'
 *     responses:
 *       201:
 *         description: AnimalType created
 */

/**
 * @openapi
 * /animal-types/{id}:
 *   patch:
 *     summary: Update an animalType
 *     tags:
 *       -  Map / AnimalTypes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The animalType ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnimalTypeInput'
 *     responses:
 *       200:
 *         description: AnimalType updated
 */

/**
 * @openapi
 * /animal-types/{id}:
 *   delete:
 *     summary: Delete an animalType
 *     tags:
 *       -  Map / AnimalTypes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The animalType ID
 *     responses:
 *       204:
 *         description: AnimalType deleted
 */
router.get('/', AnimalTypeController.getAnimalTypes);
router.get('/:id', validateId, AnimalTypeController.getAnimalType);
router.post('/', createAnimalTypeValidator, validateRequest, AnimalTypeController.createAnimalType);
router.patch(
    '/:id',
    updateAnimalTypeValidator,
    validateRequest,
    validateId,
    AnimalTypeController.updateAnimalType,
);
router.delete('/:id', validateId, AnimalTypeController.deleteAnimalType);

export default router;
