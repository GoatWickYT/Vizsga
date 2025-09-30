import { Router } from 'express';
import * as UpdateCountsController from '../controllers/updateCountsController.js';

const router = Router();

router.get('/', UpdateCountsController.getAllUpdates);

router.get('/:type', UpdateCountsController.getUpdateFor);

export default router;
