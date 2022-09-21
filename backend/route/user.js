const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const rateLimit = require('../middleware/limiter')

router.post('/signup', rateLimit.limiter, userCtrl.signup);
router.post('/login', rateLimit.limiter, userCtrl.login);

module.exports = router;
