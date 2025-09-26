Import controllers used for routes from ../controller/*.js always has to end with .js

//////////////////////////////////


import { Router } from 'express';
import {getUsers, addUsers} from '../controllers/userController.js';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);

export default router;
*/

import { Router } from 'express';
import {getAllPosts,addPost, getPost, updatePost, deletePost} from '../controllers/postcontroller.js';

const router = Router();

router.get('/', getAllPosts);
router.post('/', addPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;