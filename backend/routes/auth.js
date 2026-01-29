const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// ---------------- LOGIN ----------------
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" }); // Changed msg to message to match frontend
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: user._id,
            role: user.role,
            verified: user.isVerified
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret', // Fallback for safety
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        _id: user._id,      // <--- CRITICAL: Send the MongoDB ID
                        id: user.regId,    // This is the roll number (e.g., "23")
                        role: user.role,
                        verified: user.isVerified
                    }
                });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// ---------------- SIGNUP ----------------
router.post('/signup', async (req, res) => {
    try {
        const { email, regId, password, role } = req.body;

        if (!email.endsWith('.edu')) {
            return res.status(400).json({ message: "Only .edu emails allowed" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            regId,
            email,
            password: hashedPassword,
            role,
            isVerified: role === 'student'
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            verification: role === 'alumni' ? "Pending admin approval" : "Verified"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;