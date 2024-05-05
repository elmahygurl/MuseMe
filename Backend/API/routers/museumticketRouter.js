const express = require('express');
const router = express.Router();
const MuseumTicketController = require('../controllers/MuseumTicketController');

// Define routes
router.get('/', MuseumTicketController.getAllMuseumTickets);
router.post('/search', MuseumTicketController.getMuseumTicketByAttributes);
router.post('/create', MuseumTicketController.createMuseumTicket);
router.put('/update/:id', MuseumTicketController.updateMuseumTicket);
router.delete('/delete/:id', MuseumTicketController.deleteMuseumTicket);

module.exports = router;
