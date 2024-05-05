const express = require('express');
const router = express.Router();
const EventTicketController = require('../controllers/EventTicketController');

// Define routes
router.get('/', EventTicketController.getAllEventTickets);
router.post('/search', EventTicketController.getEventTicketByAttributes);
router.post('/create', EventTicketController.createEventTicket);
router.put('/update/:id', EventTicketController.updateEventTicket);
router.delete('/delete/:id', EventTicketController.deleteEventTicket);

module.exports = router;
