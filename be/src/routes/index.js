const express = require('express');
const router = express.Router();
const userApi = require('./user.api');
const authApi = require('./auth.api');
const dataApi = require('./data.api');
const publicApi = require('./public.api');

router.use('/user', userApi);
router.use('/auth', authApi);
router.use('/admin/data', dataApi);
router.use('/public', publicApi);

module.exports = router;
