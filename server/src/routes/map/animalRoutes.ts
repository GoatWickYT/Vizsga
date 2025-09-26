import { Router, Request, Response, NextFunction } from 'express';
import * as Controller from '../../controllers/map/animalController.js';

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
 *           type: string
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
router.get('/', Controller.getAll);
router.get('/:id', validateId, Controller.getSingle);
router.post('/', Controller.create);
router.patch('/:id', validateId, Controller.update);
router.delete('/:id', validateId, Controller.remove);

export default router;
