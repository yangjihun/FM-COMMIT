const express = require('express');
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/me', authController.authenticate, userController.getUser);
router.get('/all', authController.authenticate, authController.checkAdminPermission, userController.getAllUsers);
router.put('/level', authController.authenticate, authController.checkAdminPermission, userController.updateUserLevel);

module.exports = router;