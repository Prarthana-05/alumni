const express = require('express');
const router = express.Router();
// IMPORTANT: Ensure the file is named 'Jobs.js' in the models folder
const Job = require('../models/Jobs'); 

// 1. GET ALL JOBS
router.get('/all', async (req, res) => {
    try {
        // Validation: Ensure Job model is loaded correctly
        if (!Job || typeof Job.find !== 'function') {
            throw new Error("Job model not initialized correctly. Check models/Jobs.js export.");
        }

        const jobs = await Job.find().sort({ createdAt: -1 }); // Newest first
        res.json(jobs);
    } catch (err) {
        console.error("Backend Job Fetch Error:", err.message);
        res.status(500).json({ message: err.message, data: [] });
    }
});

// 2. POST A NEW JOB (Alumni Action)
router.post('/post', async (req, res) => {
    try {
        const { title, company, category, description, postedBy } = req.body;

        const newJob = new Job({
            title,
            company,
            category,
            description,
            postedBy
        });

        const savedJob = await newJob.save();

        // --- REAL-TIME TRIGGER ---
        const io = req.app.get('socketio');
        if (io) {
            io.emit('newJobPosted', savedJob); 
            console.log(`📢 Real-time broadcast: New job at ${company}`);
        }

        res.status(201).json({ message: "Job posted successfully!", job: savedJob });

    } catch (err) {
        console.error("Post Error:", err.message);
        res.status(500).json({ message: "Failed to post job", error: err.message });
    }
});

// ONLY ONE EXPORT AT THE BOTTOM
module.exports = router;