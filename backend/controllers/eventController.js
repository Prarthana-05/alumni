const Event = require('../models/Event');

exports.postEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();

        // Broadcast real-time
        const io = req.app.get('socketio');
        if (io) {
            io.emit('newEvent', newEvent);
        }

        res.json(newEvent);
    } catch (err) {
        res.status(500).json({ message: "Failed to post event", error: err.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch events", error: err.message });
    }
};
