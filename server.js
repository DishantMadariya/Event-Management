const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const { connectDB } = require('./config/db');

const app = express();
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// MongoDB connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
