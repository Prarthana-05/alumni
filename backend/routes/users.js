const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Assuming you use bcrypt for passwords

// 1. GET User Profile
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. UPDATE Social Links
// PUT update profile links
router.put('/update-links/:id', async (req, res) => {
    try {
        const { portfolioLink, githubLink, linkedinLink, leetcodeLink } = req.body;
        
        // We only allow these 4 fields to be updated
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { 
                portfolioLink, 
                githubLink, 
                linkedinLink, 
                leetcodeLink 
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        
        res.json({ message: "Links updated successfully!", user: updatedUser });
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

module.exports = router;