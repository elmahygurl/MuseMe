const express = require('express');
const router = express.Router();
const MuseumController = require('../controllers/museumController');

// module.exports = function () {
//     router.get('/', MuseumController.getAllMuseums);
//     router.get('/search', MuseumController.getMuseumByAttributes);
//     router.post('/create', MuseumController.createMuseum);  
//     router.put('/update/:id', MuseumController.updateMuseum);
//     router.delete('/delete/:id', MuseumController.deleteMuseum);
//     router.get('/:id', MuseumController.getMuseumById); // Example route to get a museum by ID
    

//     return router;
// }
router.get('/loadmore', MuseumController.loadMoreMuseums);
module.exports = router;
