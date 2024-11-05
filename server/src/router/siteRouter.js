const express = require('express');
const router = express.Router();
const { createBlog } = require('../app/controller/SiteController');

router.post('/create-blog', createBlog);

module.exports = router;