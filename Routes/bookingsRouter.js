const express = require('express');
const router = express.Router();
const validator = require('../Utils/joi.validator');
const { bookingSchema } = require('../Utils/joi.schemas');
const bookingController = require('../Controllers/bookingController');

// Create a new booking
router.post("/", validator(bookingSchema), bookingController.createBooking);

// Get booking by ID
router.get("/:bookingId", bookingController.getBookingById);

// Get all bookings for a user
router.get("/user/:userId", bookingController.getUserBookings);

// Update a booking
router.put("/:bookingId", bookingController.updateBooking);

// Cancel booking
router.delete("/:bookingId", bookingController.cancelBooking);

module.exports = router;