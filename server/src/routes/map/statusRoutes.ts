import { Router, Request, Response, NextFunction } from 'express';
import * as Controller from '../../controllers/map/statusController.js';

const validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'Invalid ID parameter' });
    }
    (req as any).validId = id;
    next();
};

const router = Router();

router.get('/', Controller.getAll);
router.get('/:id', validateId, Controller.getSingle);
router.post('/', Controller.create);
router.put('/:id', validateId, Controller.update);
router.delete('/:id', validateId, Controller.remove);

export default router;
