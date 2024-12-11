const express = require('express');
const router = express.Router();
const authenticateToken = require('../app/middleware/authenticateToken');

const userController = require('../app/controller/userController');

router.post('/register', userController.register);
router.post('/verify-otp', userController.verifyOTP);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/change-password', userController.changePassword);
router.put('/update-name', authenticateToken, userController.updateUserName);
router.put('/change-avatar', authenticateToken, userController.changeAvatar);

module.exports = router;