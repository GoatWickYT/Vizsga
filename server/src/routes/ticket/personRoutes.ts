import { Router } from 'express';
import { validateId } from '../../middleware/validateId.js';
import * as personController from '../../controllers/ticket/personController.js';

const personRouter = Router();

personRouter.get('/', personController.getPeople);
personRouter.post('/', personController.addPeople);
personRouter.get('/:id', validateId, personController.getPerson);
personRouter.patch('/:id', validateId, personController.updatePeople);
personRouter.delete('/:id', validateId, personController.deletePeople);

export default personRouter;
