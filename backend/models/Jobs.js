const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    // Links to the Alumni User who posted it
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    createdAt: { type: Date, default: Date.now }
});

// Use the singleton pattern to prevent "OverwriteModelError"
const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

module.exports = Job;