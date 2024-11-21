require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Auth routes import
const responseRoutes = require('./routes/responseRoutes'); // Response routes import
const filterRoutes = require('./routes/filterRoutes'); // Filter routes import

const app = express();

// Connect to MongoDB (use the environment variable for the URI)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Failed to connect to MongoDB Atlas', err));

// Middleware
app.use(express.json()); // Middleware to parse JSON request body

// Enable CORS to allow requests from the frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow local and deployed frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

// Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/responses', responseRoutes); // Response routes with unique prefix
app.use('/api/filters', filterRoutes); // Filter routes with unique prefix

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Response Code API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server (Render typically uses port 8080, but we can use the environment variable)
const PORT = process.env.PORT || 5003; // Default to 8080 if no PORT environment variable is set
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
