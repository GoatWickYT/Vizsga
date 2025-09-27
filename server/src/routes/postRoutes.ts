/*.js always has to end with .js

//////////////////////////////////


import { Router } from 'express';
import {getUsers, addUsers} from '../controllers/userController.js';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);

export default router;
*/

import { Router } from 'express'
import * as PostController from '../controllers/postcontroller.js'

const router = Router();

router.get('/', PostController.getPosts);
router.post('/', PostController.addPost);
router.get('/:id', PostController.getPost);
router.put('/:id', PostController.updatePosts);
router.delete('/:id', PostController.removePost);

export default router;