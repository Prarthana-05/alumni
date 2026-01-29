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
            return res.status(400).json({ message: "Invalid credentials" });
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
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        _id: user._id,
                        id: user.regId,
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

// ---------------- SIGNUP (Fixed Route Name) ----------------
router.post('/register', async (req, res) => { // Changed from /signup to /register to match your JS
    try {
        const { regId, email, password, role, year, graduationYear,branch } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { regId }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with this Email or Roll No already exists" });
        }

        // 🔥 CRITICAL: Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            regId,
            email,
            password: hashedPassword, // Save the hashed version

            role,
            // 2. Add 'branch' to the new User instance
            branch: role !== 'admin' ? branch : undefined,
            year: role === 'student' ? year : undefined,
            graduationYear: role === 'alumni' ? graduationYear : undefined
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;