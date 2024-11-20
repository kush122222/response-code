const ResponseList = require('../models/ResponseList');
const mongoose = require('mongoose');

// Create a new list
exports.createList = async (req, res) => {
  const { name, responseCodes } = req.body;

  if (!name || !responseCodes || !Array.isArray(responseCodes)) {
    return res.status(400).json({
      message: 'Name and responseCodes are required, and responseCodes should be an array.',
    });
  }

  try {
    const newList = new ResponseList({ name, responseCodes });
    await newList.save();
    res.status(201).json({
      message: 'List created successfully',
      list: newList,
    });
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({
      message: 'Failed to create list',
      error: error.message,
    });
  }
};

// Get all lists
exports.getLists = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const lists = await ResponseList.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await ResponseList.countDocuments();

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: lists,
    });
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({
      message: 'Failed to fetch lists',
      error: error.message,
    });
  }
};

// Filter response codes
exports.filterResponseCodes = async (req, res) => {
  const { codes } = req.query;

  if (!codes) {
    return res.status(400).json({
      message: 'Codes parameter is required in the query string.',
    });
  }

  try {
    const codeArray = codes.split(',').map((code) => code.trim());

    // If responseCodes is an array of strings, use this
    const filteredLists = await ResponseList.find({
      responseCodes: { $in: codeArray },  // $in operator for array matching
    });

    // If responseCodes is an array of objects with a 'code' field, use aggregate
    if (!filteredLists.length) {
      const filteredCodes = await ResponseList.aggregate([
        { $unwind: '$responseCodes' },
        {
          $match: {
            'responseCodes.code': { $in: codeArray },
          },
        },
        { $project: { responseCodes: 1, _id: 0 } },
      ]);

      if (!filteredCodes.length) {
        return res.status(404).json({
          message: 'No response codes matched the filter criteria.',
        });
      }

      res.status(200).json(
        filteredCodes.map((item) => item.responseCodes)
      );
    } else {
      res.status(200).json(filteredLists);
    }
  } catch (error) {
    console.error('Error filtering codes:', error);
    res.status(500).json({
      message: 'Error filtering codes',
      error: error.message,
    });
  }
};

// Get a list by ID
exports.getListById = async (req, res) => {
  const listId = req.params.id;  // Get the ID from the URL

  try {
    const list = await ResponseList.findById(listId);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.status(200).json(list); // Return the found list
  } catch (error) {
    console.error('Error fetching list by ID:', error);
    res.status(500).json({
      message: 'Error fetching list by ID',
      error: error.message,
    });
  }
};


// Edit a list
exports.editList = async (req, res) => {
  try {
    const listId = req.params.id; // The list ID from the URL
    const { name, responseCodes } = req.body; // New data from the request body

    // Log to check the listId and ensure it's being passed correctly
    console.log('Editing list with ID:', listId);

    // Find the list and update it
    const updatedList = await ResponseList.findByIdAndUpdate(
      listId, // Pass the listId directly (MongoDB should handle this)
      { name, responseCodes }, // New data to update
      { new: true } // Return the updated document
    );

    if (!updatedList) {
      console.log('No list found with this ID');
      return res.status(404).json({ message: 'List not found' });
    }

    // Send the updated list as the response
    res.json(updatedList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error editing list', error: error.message });
  }
};

// Delete a list
exports.deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedList = await ResponseList.findByIdAndDelete(id);

    if (!deletedList) {
      return res.status(404).json({ message: 'List not found' });
    }

    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting list', error: error.message });
  }
};

// Log the exported functions
console.log('Exports:', {
  createList: exports.createList,
  getLists: exports.getLists,
  filterResponseCodes: exports.filterResponseCodes,
  editList: exports.editList,
  deleteList: exports.deleteList, // New delete function
});
