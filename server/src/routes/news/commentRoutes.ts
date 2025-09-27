import { Router } from 'express';
import { validateId } from '../../middleware/validateId.js';
import * as CommentController from '../../controllers/news/commentcontroller.js';

const router = Router();

/**
 * @openapi
 * /comment:
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
 * /comment/{id}:
 *   get:
 *     summary: Get a single comment by ID
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
 *       200:
 *         description: Single comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */

/**
 * @openapi
 * /comment:
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
 * /comment/{id}:
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
 * /comment/{id}:
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
router.post('/', CommentController.addComment);
router.get('/:id', validateId, CommentController.getComment);
router.patch('/:id', validateId, CommentController.updateComments);
router.delete('/:id', validateId, CommentController.removeComment);

export default router;
