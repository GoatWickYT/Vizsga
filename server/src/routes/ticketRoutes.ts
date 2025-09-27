import { Router } from 'express';
import * as ticketController from '../controllers/ticketController.js';

const ticketRouter = Router();

// Define routes for Ticket
ticketRouter.get('/tickets', ticketController.getTickets);
ticketRouter.post('/tickets', ticketController.addTicket);
ticketRouter.get('/tickets/:id', ticketController.getTicket);
ticketRouter.put('/tickets/:id', ticketController.updateTicket);
ticketRouter.delete('/tickets/:id', ticketController.deleteTicket);

export default ticketRouter;
