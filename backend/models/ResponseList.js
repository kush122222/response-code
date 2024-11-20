const mongoose = require('mongoose');

// Subschema for individual response codes with the code and imageUrl
const responseCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

// Main schema for response lists with name and an array of response codes
const responseListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  responseCodes: {
    type: [responseCodeSchema],  // Array of responseCodeSchema objects
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,  // Default to current date
  },
});

module.exports = mongoose.model('ResponseList', responseListSchema);
