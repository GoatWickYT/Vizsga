import { Router } from 'express';
import * as ticketTypeController from '../controllers/ticket-typeController.js';

const ticketTypeRouter = Router();

// Define routes for TicketType
ticketTypeRouter.get('/ticket-types', ticketTypeController.getTicketTypes);
ticketTypeRouter.post('/ticket-types', ticketTypeController.addTicketType);
ticketTypeRouter.get('/ticket-types/:id', ticketTypeController.getTicketType);
ticketTypeRouter.put('/ticket-types/:id', ticketTypeController.updateTicketType);
ticketTypeRouter.delete('/ticket-types/:id', ticketTypeController.deleteTicketType);

export default ticketTypeRouter;
