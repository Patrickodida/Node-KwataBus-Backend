const express = require('express');
const router = express.Router();
const validator = require('../Utils/joi.validator');
const { seatSchema } = require('../Utils/joi.schemas');
const seatController = require('../Controllers/seatController');

// Get seats
router.get("/", seatController.getAllSeats);

// Create seat
router.post("/", validator(seatSchema), seatController.createSeat);

// Reserve/book a specific seat
router.post("/book", seatController.bookSeat); // Handle booking a seat

// Free up a previously booked seat
router.post("/release", seatController.releaseSeat);

// Get seat by bookingId
router.get("/booking/:bookingId", seatController.getSeatByBookingId);

module.exports = router;