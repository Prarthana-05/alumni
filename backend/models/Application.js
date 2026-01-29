const mongoose = require('mongoose');
// Remove the "../models/" part because Application.js is ALREADY inside the models folder
const Job = require('./Jobs');
const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    alumniId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: String,
    branch: String,
    cgpa: Number,
    resumeLink: String,
    status: { type: String, enum: ['applied', 'referred', 'rejected'], default: 'applied' },
    appliedAt: { type: Date, default: Date.now }
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
module.exports = Application;