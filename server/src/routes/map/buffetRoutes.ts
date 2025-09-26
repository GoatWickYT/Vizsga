import { Router, Request, Response, NextFunction } from 'express';
import * as Controller from '../../controllers/map/buffetController.js';

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
router.get('/', Controller.getAll);
router.get('/:id', validateId, Controller.getSingle);
router.post('/', Controller.create);
router.patch('/:id', validateId, Controller.update);
router.delete('/:id', validateId, Controller.remove);

export default router;
