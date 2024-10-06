# Event Management API

A RESTful API for managing events with user authentication, event creation, RSVP functionality, and event deletion. This API is built using Node.js, Express, and MongoDB, and it utilizes JWT for user authentication and Multer for image uploads.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [License](#license)

## Features

- **User Authentication**: Users can register and log in to manage their events.
- **Create Event**: Users can create events with details such as title, description, date, location, max attendees, and an event image.
- **View Events**: List all upcoming events with filtering options.
- **RSVP for Events**: Registered users can RSVP for events, with limits based on the max number of attendees.
- **Edit/Delete Events**: Event creators can edit or delete their events.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (JSON Web Tokens) for authentication
- Multer for handling file uploads
- Bcrypt.js for password hashing
- dotenv for environment variable management

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DishantMadariya/Event-Management.git
   cd Event Management
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   PORT=<your_preferred_port_number>
   ```

4. Create the `uploads` directory to store uploaded event images:

   ```bash
   mkdir uploads
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. The API will be running on `http://localhost:<your_preferred_port_number>`.

## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login a user.

### Events

- **POST** `/api/events`: Create a new event (requires authentication).
- **GET** `/api/events`: Retrieve all upcoming events.
- **POST** `/api/events/:eventId/rsvp`: RSVP for an event (requires authentication).
- **PUT** `/api/events/:eventId`: Edit an event (requires authentication).
- **DELETE** `/api/events/:eventId`: Delete an event (requires authentication).

## Folder Structure

```
/event-management-api
├── /controllers          # Business logic for handling requests
├── /middlewares          # Custom middleware (e.g., auth, file uploads)
├── /models               # Mongoose models for MongoDB
├── /routes               # API routes
├── /uploads              # Directory for storing uploaded images
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
└── server.js             # Entry point for the application
```
