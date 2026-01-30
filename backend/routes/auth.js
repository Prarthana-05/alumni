const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ---------------- LOGIN ----------------
router.post('/login', authController.login);

// ---------------- SIGNUP ----------------
router.post('/register', authController.register);
router.post('/admin/login', authController.adminLogin);

module.exports = router;