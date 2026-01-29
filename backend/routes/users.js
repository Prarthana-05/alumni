const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Assuming you use bcrypt for passwords

// 1. GET User Profile

// 1. GET User Profile - No changes needed, but ensure fields exist in DB
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. UPDATE Profile (Now including Branch and Year)
router.put('/update-links/:id', async (req, res) => {
    try {
        // Add branch, year, and graduationYear to the destructuring
        const { portfolioLink, githubLink, linkedinLink, leetcodeLink, branch, year, graduationYear } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { 
                portfolioLink, 
                githubLink, 
                linkedinLink, 
                leetcodeLink,
                branch,        // Add this
                year,          // Add this
                graduationYear // Add this
            },
            { new: true } 
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Profile updated successfully!", user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// 3. CHANGE Password
router.put('/change-password/:id', async (req, res) => {
    try {
        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// 1. Get all students who are 3rd/4th year AND verified
router.get('/mentors/list', async (req, res) => {
    try {
        const mentors = await User.find({ 
            role: 'student', 
            isVerified: true, 
            year: { $in: [3, 4] } 
        }).select('regId branch year _id');
        res.json(mentors);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 2. Simple "Request Verification" (Sends alert to Admin)
router.post('/apply-mentor/:id', async (req, res) => {
    // In a real app, you might send an email here. 
    // For now, we assume Admin manually verifies the student.
    res.json({ message: "Verification request sent! Once Admin verifies your account, you will appear in the Mentor list." });
});

// 2. Handle the apply request (Triggered by the apply function above)
router.post('/apply-mentor/:id', async (req, res) => {
    try {
        // Since we are using isVerified, this just acts as a notification 
        // Or you can update a 'mentorRequested' flag if you add it to schema
        res.json({ message: "Request received. Admin will verify your profile shortly." });
    } catch (err) {
        res.status(500).json({ message: "Request failed" });
    }
});


module.exports = router;