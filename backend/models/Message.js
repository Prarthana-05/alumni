const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    applicationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Application', 
        required: true 
    },
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);