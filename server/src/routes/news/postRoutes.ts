import { Router } from 'express';
import { updateCount } from '../../middleware/updateCounts.js';
import {
    createPostValidator,
    updatePostValidator,
} from '../../middleware/validation/news/postValidator.js';
import { validateRequest } from '../../middleware/validation/validateRequest.js';
import { validateId } from '../../middleware/validation/validateId.js';
import * as PostController from '../../controllers/news/postcontroller.js';

const router = Router();

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - News / Posts
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags:
 *       - News / Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Single post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - News / Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       201:
 *         description: post created
 */

/**
 * @openapi
 * /posts/{id}:
 *   patch:
 *     summary: Update a post
 *     tags:
 *       - News / Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       200:
 *         description: post updated
 */

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags:
 *       - News / Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       204:
 *         description: post deleted
 */
router.get('/', PostController.getPosts);
router.get('/:id', validateId, PostController.getPost);
router.post('/', createPostValidator, validateRequest, PostController.addPost, updateCount('news'));
router.patch(
    '/:id',
    updatePostValidator,
    validateRequest,
    validateId,
    PostController.updatePosts,
    updateCount('news'),
);
router.delete('/:id', validateId, PostController.removePost, updateCount('news'));

export default router;
