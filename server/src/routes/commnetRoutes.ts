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
import {getAllComments,addComment, getComment, updateComment, deleteComment} from '../controllers/commnetcontroller.js';

const router = Router();

router.get('/', getAllComments);
router.post('/', addComment);
router.get('/:id', getComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;