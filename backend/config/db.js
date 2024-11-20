const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB using your database URI
    await mongoose.connect('mongodb://localhost:27017/weather_monitoring_system', {
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Export the connection function
module.exports = connectDB;
