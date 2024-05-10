// Import necessary modules
const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticketBookingController');

// Define route for handling POST requests to /addTicket
router.post('/addTicket', TicketController.createTicket);

// Define route for handling GET requests to /addTicket (if needed)
router.get('/addTicket', (req, res) => {
  res.status(405).json({ message: 'Method Not Allowed' }); // Send an error response indicating that GET method is not allowed
});

module.exports = router;
