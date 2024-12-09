const express = require('express');
const router = express.Router();
const postController= require('../app/controller/postController');
const authenticateToken = require('../app/middleware/authenticateToken');

router.get('/blog', authenticateToken, postController.postBlog);

module.exports = router;