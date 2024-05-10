// Import necessary modules
const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticketBookingController');

// Define routes
router.post('/addTicket',TicketController.createTicket);

module.exports = router;
