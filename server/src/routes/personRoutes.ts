/*
//////////////////////////////////

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
import {getPeople, addPeople, getPerson, updatePeople, deletePeople} from '../controllers/personController.js';

const router = Router();

router.get('/', getPeople);
router.post('/', addPeople);
router.get('/:id', getPerson);
router.put('/:id', updatePeople);
router.delete('/:id', deletePeople);

export default router;
