const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Job = require('../models/Jobs');
const Application = require('../models/Application');
const Message = require('../models/Message');

// Get Pending Alumni
exports.getPendingUsers = async (req, res) => {
    try {
        // Find users where role is 'alumni' AND verificationStatus is 'pending' 
        // OR users who asked for mentor verification
        const pending = await User.find({
            role: 'alumni',
            verificationStatus: 'pending'
        });
        res.json(pending);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Verify User (Admin Action)
exports.verifyUser = async (req, res) => {
    try {
        const { status } = req.body; // 'verified' or 'rejected'
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                verificationStatus: status,
                isVerified: status === 'verified'
            },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getMentors = async (req, res) => {
    try {
        const mentors = await User.find({
            role: 'student',
            isVerified: true,
            year: { $in: [3, 4] }
        }).select('regId branch year _id');
        res.json(mentors);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.requestMentorVerification = async (req, res) => {
    try {
        // You can add logic here to notify admin
        res.json({ message: "Verification request sent! Once Admin verifies your account, you will appear in the Mentor list." });
    } catch (err) {
        res.status(500).json({ message: "Request failed" });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Invalid ID format" });
    }
};

exports.updateLinks = async (req, res) => {
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
};

exports.changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        // Total Alumni: verified alumni
        const totalAlumni = await User.countDocuments({ role: 'alumni', isVerified: true });

        // Active Students: all students
        const activeStudents = await User.countDocuments({ role: 'student' });

        // Active Opportunities: all jobs (assuming all are active)
        const activeOpportunities = await Job.countDocuments();

        // Mentorship Requests: applications with status 'applied'
        const mentorshipRequests = await Application.countDocuments({ status: 'applied' });

        // Total Interactions: all messages
        const totalInteractions = await Message.countDocuments();

        // Top Industries: aggregate users by industry
        const topIndustries = await User.aggregate([
            { $match: { role: 'alumni', isVerified: true, industry: { $exists: true, $ne: null } } },
            { $group: { _id: '$industry', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $project: { name: '$_id', count: 1, _id: 0 } }
        ]);

        res.json({
            totalAlumni,
            activeStudents,
            activeOpportunities,
            mentorshipRequests,
            totalInteractions,
            topIndustries
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getVerifiedAlumni = async (req, res) => {
    try {
        const alumni = await User.find({ role: 'alumni', isVerified: true }).select('-password');
        res.json(alumni);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).select('-password');
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
