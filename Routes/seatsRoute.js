const express = require('express');
const router = express.Router();
const validator = require('../Utils/joi.validator');
const { busRouteSchema } = require('../Utils/joi.schemas');
const seatController = require('../Controllers/seatController');

// Get seats
router.get("/", seatController.getAllSeats);

// Create seat
router.post("/", seatController.createSeat);

module.exports = router;