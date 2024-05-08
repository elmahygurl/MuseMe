const express = require('express');
const router = express.Router();
const MuseumController = require('../controllers/museumController');

router.get('/', MuseumController.getAllMuseums);
router.get('/search', MuseumController.getMuseumByAttributes);
router.post('/create', MuseumController.createMuseum);
router.put('/update/:id', MuseumController.updateMuseum);
router.delete('/delete/:id', MuseumController.deleteMuseum);


module.exports = router;
