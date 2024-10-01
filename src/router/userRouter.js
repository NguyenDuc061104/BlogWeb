const express = require('express');
const router = express.Router();

const userController = require('../app/controller/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/change-password', userController.changePassword);

module.exports = router;