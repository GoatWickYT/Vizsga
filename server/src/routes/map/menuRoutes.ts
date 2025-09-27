import { Router } from 'express';
import { validateId } from '../../middleware/validateId.js';
import * as MenuController from '../../controllers/map/menuController.js';

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
router.get('/', MenuController.getMenus);
router.get('/:id', validateId, MenuController.getMenu);
router.post('/', MenuController.createMenu);
router.patch('/:id', validateId, MenuController.updateMenu);
router.delete('/:id', validateId, MenuController.deleteMenu);

export default router;
