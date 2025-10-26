const express = require('express');
const router = express.Router();
const authController = require("../controller/auth.controller");

router.post('/google', authController.loginWithGoogle);
router.post('/admin', authController.loginAdmin);
router.post('/admin/promote', authController.authenticate, authController.promoteToAdmin);
router.post('/admin/demote', authController.authenticate, authController.demoteFromAdmin);

module.exports = router;