const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Jobs');

// 1. GET applications for a specific student (For the 'My Applications' page)
router.get('/student/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        
        // Populate 'jobId' to get Title and Company names in the table
        const applications = await Application.find({ studentId })
            .populate('jobId') 
            .sort({ appliedAt: -1 });

        res.status(200).json(applications || []);
    } catch (err) {
        console.error("Fetch Apps Error:", err);
        res.status(500).json({ message: "Server error fetching applications" });
    }
});

// 2. POST apply for a job
router.post('/apply', async (req, res) => {
    try {
        const { jobId, studentId, studentName, branch, cgpa, resumeLink } = req.body;
        
        // --- STEP A: PRE-CHECK FOR DUPLICATES ---
        // This ensures the student doesn't apply twice to the same job
        const existingApp = await Application.findOne({ jobId, studentId });
        if (existingApp) {
            return res.status(400).json({ 
                message: "You have already applied for this job! Check 'My Applications' to chat." 
            });
        }

        // --- STEP B: CHECK IF JOB EXISTS ---
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // --- STEP C: CREATE AND SAVE ---
        const newApp = new Application({
            jobId,
            studentId,
            // Uses the ID of the alumni who posted the job
            alumniId: job.postedBy || "000000000000000000000000", 
            studentName,
            branch,
            cgpa,
            resumeLink,
            status: 'applied'
        });

        const savedApp = await newApp.save();

        // Send back the 'application' object so frontend can use the new _id for chat
        res.status(201).json({ 
            message: 'Application submitted!', 
            application: savedApp 
        });

    } catch (err) {
        // Handle MongoDB unique index error (backup check)
        if (err.code === 11000) {
            return res.status(400).json({ message: "You have already applied for this job!" });
        }
        console.error("Backend Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/check', async (req, res) => {
    try {
        const { jobId, studentId } = req.query;
        const app = await Application.findOne({ jobId, studentId });
        if (app) {
            return res.json({ exists: true, applicationId: app._id });
        }
        res.json({ exists: false });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Example of a Status Update Route
router.patch('/update-status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedApp = await Application.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        ).populate('jobId');

        // 🔥 REAL-TIME TRIGGER: Tell the student their status changed
        const io = req.app.get('socketio'); 
        io.to(updatedApp.studentId.toString()).emit('statusUpdated', updatedApp);

        res.json(updatedApp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;