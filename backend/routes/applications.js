const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// 1. GET applications for a specific student (For the 'My Applications' page)
router.get('/student/:studentId', applicationController.getStudentApplications);

// 2. POST apply for a job
router.post('/apply', applicationController.applyForJob);

router.get('/check', applicationController.checkApplication);

router.get('/:id', applicationController.getApplicationById);

// Example of a Status Update Route
router.patch('/update-status/:id', applicationController.updateStatus);

// Admin route for mentorship requests
router.get('/admin/requests', applicationController.getAdminMentorshipRequests);

module.exports = router;