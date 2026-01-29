const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Jobs');


// GET applications for a specific student
router.get('/student/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        
        // Find applications and "populate" job details so we see the Title/Company
        const applications = await Application.find({ studentId })
            .populate('jobId') 
            .sort({ appliedAt: -1 });

        if (!applications) {
            return res.status(200).json([]);
        }

        res.json(applications);
    } catch (err) {
        console.error("Fetch Apps Error:", err);
        res.status(500).json({ message: "Server error fetching applications" });
    }
});

router.post('/apply', async (req, res) => {
    try {
        const { jobId, studentId, studentName, branch, cgpa, resumeLink } = req.body;
        
        // 1. Check if Job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        const newApp = new Application({
            jobId,
            studentId,
            // Fallback to a dummy ID or null if postedBy is missing in your dummy data
            alumniId: job.postedBy || "000000000000000000000000", 
            studentName,
            branch,
            cgpa,
            resumeLink
        });

        await newApp.save();
        const newApplication = new Application(req.body);
const savedApp = await newApplication.save();

// We MUST send back the savedApp object so the frontend gets the _id
res.status(201).json({ 
    message: 'Application submitted!', 
    application: savedApp 
});
    } catch (err) {
        console.error("Backend Error:", err); // Check your VS Code Terminal for this!
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;            // 3. BOTTOM (Crucial!)