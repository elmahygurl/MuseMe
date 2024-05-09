const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.getAllUsers);
router.post('/create', UserController.createUser);
router.post('/login', UserController.login);
router.delete('/delete', UserController.deleteUser);
router.put('/update/:id', UserController.updateUser);
router.get('/search', UserController.getUserByAttributes);
module.exports = router;

