const Message = require('../models/Message');

exports.getChatHistory = async (req, res) => {
    try {
        const history = await Message.find({ applicationId: req.params.applicationId })
            .sort({ timestamp: 1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: "Error loading chat history" });
    }
};
