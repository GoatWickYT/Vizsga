/*.js always has to end with .js

//////////////////////////////////


import { Router } from 'express';
import {getUsers, addUsers} from '../controllers/userController.js';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);

export default router;
*/

import { Router } from 'express';
import * as CommentController from '../controllers/commentcontroller.js'

const router = Router();

router.get('/', CommentController.getComments);
router.post('/', CommentController.addComment);
router.get('/:id', CommentController.getComment);
router.put('/:id', CommentController.updateComments);
router.delete('/:id', CommentController.removeComment);

export default router;