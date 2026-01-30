const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Get chat history for a specific application/referral
router.get('/:applicationId', messageController.getChatHistory);

module.exports = router;