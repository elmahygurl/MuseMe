const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

module.exports = function () {
    router.get('/', UserController.getAllUsers);
    router.post('/create', UserController.createUser);
    router.delete('/delete', UserController.deleteUser);
    router.put('/update/:id', UserController.updateUser);
    router.get('/search', UserController.getUserByAttributes);
    return router;
}
