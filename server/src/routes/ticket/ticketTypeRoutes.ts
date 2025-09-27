import { Router } from 'express';
import { validateId } from '../../middleware/validateId.js';
import * as ticketTypeController from '../../controllers/ticket/ticketTypeController.js';

const ticketTypeRouter = Router();

ticketTypeRouter.get('/ticket-types', ticketTypeController.getTicketTypes);
ticketTypeRouter.post('/ticket-types', ticketTypeController.addTicketType);
ticketTypeRouter.get('/ticket-types/:id', validateId, ticketTypeController.getTicketType);
ticketTypeRouter.patch('/ticket-types/:id', validateId, ticketTypeController.updateTicketType);
ticketTypeRouter.delete('/ticket-types/:id', validateId, ticketTypeController.deleteTicketType);

export default ticketTypeRouter;
