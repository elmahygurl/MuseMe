const express = require('express');
const router = express.Router();
const TicketsController = require('../controllers/ticketsController');

router.get('/Mtickets', TicketsController.getAllMuseumtickets);
router.get('/Etickets', TicketsController.getAllEventsTickets);


module.exports = router;
