const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const auth = require('../middleware/auth'); // Assuming you have an auth middleware

// Public: View all experiences
router.get('/', experienceController.getExperiences);

// Public: View single experience
router.get('/:id', experienceController.getExperienceById);

// Private: Add new experience (Alumni only logic can be added here or in controller)
router.post('/', auth, experienceController.createExperience);

// Admin routes
router.get('/admin/pending', experienceController.getPendingExperiences);
router.put('/admin/:id', experienceController.moderateExperience);

module.exports = router;
