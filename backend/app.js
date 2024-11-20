const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection function
const authRoutes = require('./routes/authRoutes'); // Auth routes import
const responseRoutes = require('./routes/responseRoutes'); // Response routes import
const filterRoutes = require('./routes/filterRoutes'); // Filter routes import
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Middleware to parse JSON request body

// Enable CORS to allow requests from the frontend
app.use(
  cors({
    origin: 'http://localhost:4000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

// Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api', responseRoutes); // Response routes
app.use('/api', filterRoutes); // Filter routes

// Debugging to ensure routers are imported correctly
console.log('Auth Routes:', typeof authRoutes); // Should log 'function'
console.log('Response Routes:', typeof responseRoutes); // Should log 'function');

// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
