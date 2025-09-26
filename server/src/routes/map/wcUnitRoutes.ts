import { Router, Request, Response, NextFunction } from 'express';
import * as Controller from '../../controllers/map/wcUnitController.js';

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
 * /wcUnits:
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
 * /wcUnits/{id}:
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
 * /wcUnits:
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
 * /wcUnits/{id}:
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
 * /wcUnits/{id}:
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
router.get('/', Controller.getAll);
router.get('/:id', validateId, Controller.getSingle);
router.post('/', Controller.create);
router.patch('/:id', validateId, Controller.update);
router.delete('/:id', validateId, Controller.remove);

export default router;
