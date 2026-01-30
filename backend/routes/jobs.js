const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// 1. GET ALL JOBS
router.get('/all', jobController.getAllJobs);

// 2. POST A NEW JOB (Alumni Action)
router.post('/post', jobController.postJob);

// 3. GET JOBS FOR ADMIN
router.get('/admin', jobController.getAdminJobs);

module.exports = router;