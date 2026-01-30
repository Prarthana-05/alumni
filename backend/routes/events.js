const router = require('express').Router();
const eventController = require('../controllers/eventController');

router.post('/post', eventController.postEvent);

router.get('/all', eventController.getAllEvents);

module.exports = router;