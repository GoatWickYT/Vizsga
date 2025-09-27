import { Router } from 'express';
import { validateId } from '../../middleware/validateId.js';
import * as CommentController from '../../controllers/news/commentcontroller.js';

const router = Router();

router.get('/', CommentController.getComments);
router.post('/', CommentController.addComment);
router.get('/:id', validateId, CommentController.getComment);
router.patch('/:id', validateId, CommentController.updateComments);
router.delete('/:id', validateId, CommentController.removeComment);

export default router;
