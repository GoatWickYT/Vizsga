import { Router } from 'express';
import { validateId } from '../../middleware/validateId.js';
import * as PostController from '../../controllers/news/postcontroller.js';

const router = Router();

router.get('/', PostController.getPosts);
router.post('/', PostController.addPost);
router.get('/:id', validateId, PostController.getPost);
router.patch('/:id', validateId, PostController.updatePosts);
router.delete('/:id', validateId, PostController.removePost);

export default router;
