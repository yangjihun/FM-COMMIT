const express = require('express');
const router = express.Router();
const dataController = require('../controller/data.controller');

router.get('/projects', dataController.getProjects);
router.get('/study', dataController.getStudy);
router.get('/regular-study', dataController.getRegularStudy);

module.exports = router;
