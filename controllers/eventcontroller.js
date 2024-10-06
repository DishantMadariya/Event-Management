const Event = require('../models/Event');
const path = require('path');

// Create Event with Image
module.exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, maxAttendees } = req.body;
        const eventImage = req.file ? req.file.path : null;  // Store image path

        const event = new Event({
            title,
            description,
            date,
            location,
            maxAttendees,
            image: eventImage, // Store image path in database
            createdBy: req.userId,
        });

        await event.save();
        res.status(201).json({ message: 'Event created', event });
    } catch (error) {
        res.status(500).json({ error: 'Event creation failed' });
    }
};

// View Events (including image path)
module.exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

// Edit Event (with optional image update)
module.exports.editEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);

        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (req.file) event.image = req.file.path; // Update image if provided
        Object.assign(event, req.body); // Update other fields

        await event.save();
        res.status(200).json({ message: 'Event updated', event });
    } catch (error) {
        res.status(500).json({ error: 'Event update failed' });
    }
};

module.exports.rsvpEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.userId; // Assuming `authMiddleware` adds `userId` to req object after decoding JWT

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the event is already full
        if (event.attendees.length >= event.maxAttendees) {
            return res.status(400).json({ message: 'Event is fully booked' });
        }

        // Check if user has already RSVP'd
        if (event.attendees.includes(userId)) {
            return res.status(400).json({ message: 'You have already RSVP\'d to this event' });
        }

        // Add user to the event's attendees list
        event.attendees.push(userId);

        await event.save();
        return res.status(200).json({ message: 'Successfully RSVP\'d for the event', event });
    } catch (error) {
        return res.status(500).json({ error: 'RSVP failed', details: error.message });
    }
};

module.exports.deleteEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
      const userId = req.userId;  // Assuming authMiddleware adds userId to req object after decoding JWT
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Check if the current user is the creator of the event
      if (event.createdBy.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this event' });
      }
  
      await Event.findByIdAndDelete(eventId);
      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete event', details: error.message });
    }
  };