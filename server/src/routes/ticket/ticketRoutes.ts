import { Router } from 'express';
import { validateId } from '../../middleware/validateId.js';
import * as ticketController from '../../controllers/ticket/ticketController.js';

const ticketRouter = Router();

ticketRouter.get('/tickets', ticketController.getTickets);
ticketRouter.post('/tickets', ticketController.addTicket);
ticketRouter.get('/tickets/:id', validateId, ticketController.getTicket);
ticketRouter.patch('/tickets/:id', validateId, ticketController.updateTicket);
ticketRouter.delete('/tickets/:id', validateId, ticketController.deleteTicket);

export default ticketRouter;
