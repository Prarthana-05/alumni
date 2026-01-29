const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    postedBy: { type: String }, // This will be the Alumni's name or ID
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);