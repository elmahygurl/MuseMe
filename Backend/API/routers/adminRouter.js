const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

module.exports = function () {
    router.get('/', AdminController.getAllAdmins);
    router.post('/create', AdminController.createAdmin);
    router.delete('/delete', AdminController.deleteAdmin);
    router.put('/update/:id', AdminController.updateAdmin);
    router.get('/search', AdminController.getAdminByAttributes);
    return router;
}
