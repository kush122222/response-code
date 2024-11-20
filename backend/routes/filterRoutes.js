const express = require('express');
const ResponseList = require('../models/ResponseList'); // Your model for lists

const router = express.Router();

// GET /api/filter endpoint for filtering lists by codes
router.get('/filter', async (req, res) => {
  const { codes } = req.query; // Get the codes from the query string

  if (!codes) {
    return res.status(400).json({ message: 'No codes provided for filtering' });
  }

  // Split the codes into an array and ensure they are treated as strings
  const codeArray = codes.split(',').map(code => String(code).trim());

  try {
    // Debugging: Log the formatted codeArray
    console.log('Code Array:', codeArray);

    // Query MongoDB to find lists with any of the responseCodes matching the provided codes
    const filteredLists = await ResponseList.find({
      responseCodes: { $in: codeArray }, // MongoDB $in operator to match any of the codes in the list
    });

    if (!filteredLists.length) {
      return res.status(404).json({ message: 'No lists found matching the filter criteria' });
    }

    // Debugging: Log filtered lists
    console.log('Filtered Lists:', filteredLists);

    res.status(200).json(filteredLists);
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ message: 'Error filtering codes', error: error.message });
  }
});

module.exports = router;
