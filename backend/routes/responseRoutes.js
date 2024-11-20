const express = require('express');
const {
  createList,
  getLists,
  filterResponseCodes,
  editList,
  deleteList,
} = require('../controllers/responseController');
const router = express.Router();

// Define your routes
router.post('/lists', createList);
router.get('/lists', getLists);
router.get('/filter', filterResponseCodes);  // Filtering response codes
router.put('/lists/:id', editList);
router.delete('/lists/:id', deleteList);   // Ensure you are exporting deleteList correctly

module.exports = router;  // Correct export
