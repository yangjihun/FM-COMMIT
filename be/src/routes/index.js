const express = require('express');
const router = express.Router();
const userApi = require('./user.api');
const authApi = require('./auth.api');
const dataApi = require('./data.api');

router.use('/user', userApi);
router.use('/auth', authApi);
router.use('/admin/data', dataApi);

module.exports = router;