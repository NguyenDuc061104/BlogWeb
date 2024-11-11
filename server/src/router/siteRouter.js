const express = require('express');
const router = express.Router();
const siteController= require('../app/controller/SiteController');
const authenticateToken = require('../app/middleware/authenticateToken');

router.post('/create-blog', authenticateToken.authenticateToken, siteController.createBlog);

module.exports = router;