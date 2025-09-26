import { Router, Request, Response, NextFunction } from 'express';
import * as Controller from '../../controllers/map/menuController.js';

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
 * /menus:
 *   get:
 *     summary: Get all menus
 *     tags:
 *       - Map / Menus
 *     responses:
 *       200:
 *         description: List of menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */

/**
 * @openapi
 * /menus/{id}:
 *   get:
 *     summary: Get a single menu by ID
 *     tags:
 *       - Map / Menus
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The menu ID
 *     responses:
 *       200:
 *         description: Single menu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 */

/**
 * @openapi
 * /menus:
 *   post:
 *     summary: Create a new menu
 *     tags:
 *       - Map / Menus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuInput'
 *     responses:
 *       201:
 *         description: menu created
 */

/**
 * @openapi
 * /menus/{id}:
 *   patch:
 *     summary: Update a menu
 *     tags:
 *       - Map / Menus
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The menu ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuInput'
 *     responses:
 *       200:
 *         description: menu updated
 */

/**
 * @openapi
 * /menus/{id}:
 *   delete:
 *     summary: Delete a menu
 *     tags:
 *       - Map / Menus
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The menu ID
 *     responses:
 *       204:
 *         description: menu deleted
 */
router.get('/', Controller.getAll);
router.get('/:id', validateId, Controller.getSingle);
router.post('/', Controller.create);
router.patch('/:id', validateId, Controller.update);
router.delete('/:id', validateId, Controller.remove);

export default router;
