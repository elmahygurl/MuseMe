const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');

router.get('/', EventController.getAllEvents);
router.post('/create', EventController.createEvent);
router.delete('/delete', EventController.deleteEvent);
router.put('/update/:id', EventController.updateEvent);
router.get('/search', EventController.getEventByAttributes);
module.exports = router;

