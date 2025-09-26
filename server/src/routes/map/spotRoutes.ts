import { Router, Request, Response, NextFunction } from 'express';
import * as Controller from '../../controllers/map/spotController.js';

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
router.get('/', Controller.getAll);
router.get('/:id', validateId, Controller.getSingle);
router.post('/', Controller.create);
router.patch('/:id', validateId, Controller.update);
router.delete('/:id', validateId, Controller.remove);

export default router;
