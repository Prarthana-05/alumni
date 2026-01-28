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
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const payload = {
            id: user._id,
            role: user.role,
            verified: user.isVerified
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.regId,
                        role: user.role,
                        verified: user.isVerified
                    }
                });
            }
        );
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

// ---------------- SIGNUP ----------------
router.post('/signup', async (req, res) => {
    console.log("Data received from frontend:", req.body); // ADD THIS LINE
    try {
        const { email, regId, password, role } = req.body;

        // EDU domain check
        if (!email.endsWith('.edu')) {
            return res.status(400).json({ msg: "Only .edu emails allowed" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already registered" });
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
            msg: "User registered successfully",
            verification: role === 'alumni' ? "Pending admin approval" : "Verified"
        });

    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
