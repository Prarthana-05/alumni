const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// --- 1. SPECIFIC ROUTES FIRST ---

// Get all verified senior mentors
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

// Request Mentor Verification
router.post('/apply-mentor/:id', async (req, res) => {
    try {
        // You can add logic here to notify admin
        res.json({ message: "Verification request sent! Once Admin verifies your account, you will appear in the Mentor list." });
    } catch (err) {
        res.status(500).json({ message: "Request failed" });
    }
});

// --- 2. DYNAMIC ID ROUTES LAST ---

// GET User Profile
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Invalid ID format" });
    }
});

// UPDATE Profile
router.put('/update-links/:id', async (req, res) => {
    try {
        const { portfolioLink, githubLink, linkedinLink, leetcodeLink, branch, year, graduationYear } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { portfolioLink, githubLink, linkedinLink, leetcodeLink, branch, year, graduationYear },
            { new: true } 
        );
        res.json({ message: "Profile updated successfully!", user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CHANGE Password
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

module.exports = router;