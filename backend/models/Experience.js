const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    type: { type: String, enum: ['Internship', 'Full-time'], default: 'Full-time' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    description: { type: String, required: true }, // The main content
    rounds: { type: Number, default: 1 },

    // Metadata
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String }, // Cache name for faster display
    tags: [{ type: String }], // e.g. ["DSA", "System Design", "Behavioral"]

    // Engagement
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: { type: Number, default: 0 },

    // Moderation
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
