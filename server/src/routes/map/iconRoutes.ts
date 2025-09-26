import { Router, Request, Response, NextFunction } from 'express';
import * as Controller from '../../controllers/map/iconController.js';

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
 * /icons:
 *   get:
 *     summary: Get all Icons
 *     tags:
 *       - Map / Icons
 *     responses:
 *       200:
 *         description: List of icons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Icon'
 */

/**
 * @openapi
 * /icons/{id}:
 *   get:
 *     summary: Get a single icon by ID
 *     tags:
 *       - Map / Icons
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The icon ID
 *     responses:
 *       200:
 *         description: Single Icon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Icon'
 */

/**
 * @openapi
 * /icons:
 *   post:
 *     summary: Create a new icon
 *     tags:
 *       - Map / Icons
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IconInput'
 *     responses:
 *       201:
 *         description: Icon created
 */

/**
 * @openapi
 * /icons/{id}:
 *   patch:
 *     summary: Update an icon
 *     tags:
 *       - Map / Icons
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Icon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IconInput'
 *     responses:
 *       200:
 *         description: Icon updated
 */

/**
 * @openapi
 * /icons/{id}:
 *   delete:
 *     summary: Delete an Icon
 *     tags:
 *       - Map / Icons
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The icon ID
 *     responses:
 *       204:
 *         description: Icon deleted
 */
router.get('/', Controller.getAll);
router.get('/:id', validateId, Controller.getSingle);
router.post('/', Controller.create);
router.patch('/:id', validateId, Controller.update);
router.delete('/:id', validateId, Controller.remove);

export default router;
