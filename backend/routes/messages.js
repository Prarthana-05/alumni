const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get chat history for a specific application/referral
router.get('/:applicationId', async (req, res) => {
    try {
        const history = await Message.find({ applicationId: req.params.applicationId })
                                     .sort({ timestamp: 1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: "Error loading chat history" });
    }
});

module.exports = router;