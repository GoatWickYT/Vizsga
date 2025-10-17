import * as MenuController from '../../controllers/map/menuController.js';
import { Router } from 'express';

import {
    createMenuValidator,
    updateMenuValidator,
} from '../../middleware/validation/map/menuValidator.js';
import { validateId } from '../../middleware/validation/validateId.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { authorizeRoles } from '../../middleware/auth/authorizeRoles.js';
import { attachUser } from '../../middleware/auth/attachUser.js';
import { Roles } from '../../types/roles.js';

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
 *           type: number
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

router.use(attachUser, authorizeRoles(Roles.Admin, Roles.Owner));

router.post('/', createMenuValidator, validateRequest, MenuController.createMenu);
router.patch('/:id', updateMenuValidator, validateRequest, validateId, MenuController.updateMenu);
router.delete('/:id', validateId, MenuController.deleteMenu);

export default router;
