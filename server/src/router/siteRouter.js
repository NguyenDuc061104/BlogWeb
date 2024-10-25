const express = require('express');
const router = express.Router();
const siteController = require('server/src/app/controller/siteController');

router.get('/',siteController.index);

module.exports = router;