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
import * as personController from '../controllers/personController.js';

const personRouter = Router();

// Define routes for people
personRouter.get('/', personController.getPeople);
personRouter.post('/', personController.addPeople);
personRouter.get('/:id', personController.getPerson);
personRouter.put('/:id', personController.updatePeople);
personRouter.delete('/:id', personController.deletePeople);

export default personRouter;
