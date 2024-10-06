const express = require('express');
const { createEvent, getAllEvents, rsvpEvent, editEvent, deleteEvent } = require('../controllers/eventcontroller');
const { authMiddleware } = require('../middleware/auuthmiddleware');
const upload = require('../middleware/uploadMiddleware');  // Import the Multer upload middleware
const router = express.Router();

// Event routes
router.post('/', authMiddleware, upload.single('eventImage'), createEvent);  // Single image upload
router.get('/', getAllEvents);
router.post('/:eventId/rsvp', authMiddleware, rsvpEvent);
router.put('/:eventId', authMiddleware, upload.single('eventImage'), editEvent);  // Allow image update
router.delete('/:eventId', authMiddleware, deleteEvent);

module.exports = router;
