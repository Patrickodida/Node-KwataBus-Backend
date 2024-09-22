const express = require('express');
const router = express.Router();
const seatController = require('../Controllers/seatController');

// Reserve/book a specific seat
router.post("/", seatController.bookSeat); // Handle booking a seat

module.exports = router;