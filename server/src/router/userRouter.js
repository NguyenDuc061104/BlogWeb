const express = require('express');
const router = express.Router();

const userController = require('server/src/app/controller/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/change-password', userController.changePassword);
router.post('/verify-otp', userController.verifyOTP);

module.exports = router;