const Experience = require('../models/Experience');
const User = require('../models/User');

// Get all experiences with filters
exports.getExperiences = async (req, res) => {
    try {
        const { company, role, difficulty } = req.query;
        let query = {};

        if (company) query.company = { $regex: company, $options: 'i' };
        if (role) query.role = { $regex: role, $options: 'i' };
        if (difficulty) query.difficulty = difficulty;

        const experiences = await Experience.find(query)
            .sort({ createdAt: -1 })
            .populate('author', 'name year branch');

        res.json(experiences);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new experience
exports.createExperience = async (req, res) => {
    try {
        const { company, role, type, difficulty, description, rounds, tags } = req.body;

        const user = await User.findById(req.user.id);

        const newExp = new Experience({
            company,
            role,
            type,
            difficulty,
            description,
            rounds,
            tags,
            author: req.user.id,
            authorName: user.name || "Alumni"
        });

        await newExp.save();
        res.status(201).json(newExp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get single experience details
exports.getExperienceById = async (req, res) => {
    try {
        const exp = await Experience.findById(req.params.id).populate('author', 'name batch branch');
        if (!exp) return res.status(404).json({ message: "Experience not found" });

        // Increment views
        exp.views += 1;
        await exp.save();

        res.json(exp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin: Get pending experiences (assuming all are pending for moderation)
exports.getPendingExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find({ status: 'pending' })
            .populate('author', 'name email')
            .sort({ createdAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin: Moderate experience
exports.moderateExperience = async (req, res) => {
    try {
        const { status } = req.body; // 'approved' or 'rejected'
        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(experience);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
