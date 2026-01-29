const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    regId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'alumni', 'admin'], required: true },
    isVerified: { type: Boolean, default: false },
    
    portfolioLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    linkedinLink: { type: String, default: "" },
    leetcodeLink: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);