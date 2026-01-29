const router = require('express').Router();
const Event = require('../models/Event');

router.post('/post', async (req, res) => {
    const newEvent = new Event(req.body);
    await newEvent.save();
    
    // Broadcast real-time
    req.app.get('socketio').emit('newEvent', newEvent);
    
    res.json(newEvent);
});

router.get('/all', async (req, res) => {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
});

module.exports = router;