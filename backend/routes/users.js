const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// --- 1. SPECIFIC ROUTES FIRST ---

// Get all verified senior mentors
router.get('/mentors/list', userController.getMentors);

// Request Mentor Verification
router.post('/apply-mentor/:id', userController.requestMentorVerification);

// --- Admin Verification Routes ---
router.get('/admin/pending', userController.getPendingUsers);
router.put('/admin/verify/:id', userController.verifyUser);
router.get('/admin/analytics', userController.getAnalytics);
router.get('/admin/alumni', userController.getVerifiedAlumni);
router.get('/admin/students', userController.getStudents);

// --- 2. DYNAMIC ID ROUTES LAST ---

// GET User Profile
router.get('/:id', userController.getUserById);

// UPDATE Profile
router.put('/update-links/:id', userController.updateLinks);

// CHANGE Password
router.put('/change-password/:id', userController.changePassword);

module.exports = router;