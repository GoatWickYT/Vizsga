import { Router, Request, Response, NextFunction } from 'express';
import * as Controller from '../../controllers/map/animalTypeController.js';

const validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'Invalid ID parameter' });
    }
    (req as any).validId = id;
    next();
};

const router = Router();

/**
 * @openapi
 * /animalTypes:
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
 * /animalTypes/{id}:
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
 * /animalTypes:
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
 * /animalTypes/{id}:
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
 * /animalTypes/{id}:
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
router.get('/', Controller.getAll);
router.get('/:id', validateId, Controller.getSingle);
router.post('/', Controller.create);
router.patch('/:id', validateId, Controller.update);
router.delete('/:id', validateId, Controller.remove);

export default router;
