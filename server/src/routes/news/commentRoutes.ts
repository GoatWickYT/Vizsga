import * as CommentController from '../../controllers/news/commentController.js';
import { Router } from 'express';

import {
    createCommentValidator,
    updateCommentValidator,
} from '../../middleware/validation/news/commentValidator.js';
import { validateId } from '../../middleware/validation/validateId.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { authorizeRoles } from '../../middleware/auth/authorizeRoles.js';
import { attachUser } from '../../middleware/auth/attachUser.js';
import { Roles } from '../../types/roles.js';

const router = Router();

/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Get all comment
 *     tags:
 *       - News / Comments
 *     responses:
 *       200:
 *         description: List of comment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */

/**
 * @openapi
 * /comments/{id}:
 *   get:
 *     summary: Get a single comment by ID
 *     tags:
 *       - News / Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Single comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags:
 *       - News / Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       201:
 *         description: comment created
 */

/**
 * @openapi
 * /comments/{id}:
 *   patch:
 *     summary: Update a comment
 *     tags:
 *       - News / Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       200:
 *         description: comment updated
 */

/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - News / Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     responses:
 *       204:
 *         description: comment deleted
 */
router.get('/', CommentController.getComments);
router.get('/:id', CommentController.getComment);

router.use(attachUser, authorizeRoles(Roles.Admin, Roles.Owner));

router.post('/', createCommentValidator, validateRequest, validateId, CommentController.addComment);
router.patch(
    '/:id',
    updateCommentValidator,
    validateRequest,
    validateId,
    CommentController.updateComments,
);
router.delete('/:id', validateId, CommentController.removeComment);

export default router;
