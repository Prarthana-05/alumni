const express = require('express');
const router = express.Router();
const Job = require('../models/Jobs');

// 1. GET ALL JOBS (For initial dashboard load)
router.get('/all', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 }); // Newest first
        res.json(jobs);
    } catch (err) {
        console.error("Fetch Error:", err.message);
        res.status(500).json({ message: "Error fetching jobs" });
    }
});

// 2. POST A NEW JOB (Alumni Action)
router.post('/post', async (req, res) => {
    try {
        const { title, company, category, description, postedBy } = req.body;

        // Save to MongoDB
        const newJob = new Job({
            title,
            company,
            category,
            description,
            postedBy
        });

        const savedJob = await newJob.save();

        // --- REAL-TIME TRIGGER ---
        // Retrieve the Socket.io instance we set in server.js
        const io = req.app.get('socketio');
        
        // Emit (Broadcast) the new job to everyone connected
        io.emit('newJobPosted', savedJob); 
        // -------------------------

        res.status(201).json({ message: "Job posted successfully!", job: savedJob });
        console.log(`📢 Real-time broadcast: New job at ${company}`);

    } catch (err) {
        console.error("Post Error:", err.message);
        res.status(500).json({ message: "Failed to post job" });
    }
});

module.exports = router;