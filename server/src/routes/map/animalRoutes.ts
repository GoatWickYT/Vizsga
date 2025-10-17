import * as AnimalController from '../../controllers/map/animalController.js';
import { Router } from 'express';

import {
    createAnimalValidator,
    updateAnimalValidator,
} from '../../middleware/validation/map/animalValidator.js';
import { validateId } from '../../middleware/validation/validateId.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { authorizeRoles } from '../../middleware/auth/authorizeRoles.js';
import { attachUser } from '../../middleware/auth/attachUser.js';
import { Roles } from '../../types/roles.js';

const router = Router();

/**
 * @openapi
 * /animals:
 *   get:
 *     summary: Get all animals
 *     tags:
 *       - Map / Animals
 *     responses:
 *       200:
 *         description: List of animals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 */

/**
 * @openapi
 * /animals/{id}:
 *   get:
 *     summary: Get a single animal by ID
 *     tags:
 *       - Map / Animals
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The animal ID
 *     responses:
 *       200:
 *         description: Single animal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 */

/**
 * @openapi
 * /animals:
 *   post:
 *     summary: Create a new animal
 *     tags:
 *       - Map / Animals
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnimalInput'
 *     responses:
 *       201:
 *         description: Animal created
 */

/**
 * @openapi
 * /animals/{id}:
 *   patch:
 *     summary: Update an animal
 *     tags:
 *       - Map / Animals
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The animal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnimalInput'
 *     responses:
 *       200:
 *         description: Animal updated
 */

/**
 * @openapi
 * /animals/{id}:
 *   delete:
 *     summary: Delete an animal
 *     tags:
 *       - Map / Animals
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The animal ID
 *     responses:
 *       204:
 *         description: Animal deleted
 */
router.get('/', AnimalController.getAnimals);
router.get('/:id', validateId, AnimalController.getAnimal);

router.use(attachUser, authorizeRoles(Roles.Admin, Roles.Owner));

router.post('/', createAnimalValidator, validateRequest, AnimalController.createAnimal);
router.patch(
    '/:id',
    updateAnimalValidator,
    validateRequest,
    validateId,
    AnimalController.updateAnimal,
);
router.delete('/:id', validateId, AnimalController.deleteAnimal);

export default router;
