const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    regId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'alumni', 'admin'], required: true },
    isVerified: { type: Boolean, default: false },
    branch: { type: String, required: function() { return this.role !== 'admin'; } },
    
    // For Students: Current Year (1, 2, 3, 4)
    year: { 
        type: Number, 
        enum: [1, 2, 3, 4], 
        required: function() { return this.role === 'student'; } 
    },

    // For Alumni: Graduation Year (e.g., 2024)
    graduationYear: {
        type: Number,
        required: function() { return this.role === 'alumni'; }
    },

    portfolioLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    linkedinLink: { type: String, default: "" },
    leetcodeLink: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);