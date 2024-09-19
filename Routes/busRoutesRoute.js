const express = require('express');
const router = express.Router();
const busRouteController = require('../Controllers/busRouteController');

// Get busRoutes
router.get("/", busRouteController.getAllBusRoutes);

// Create busRoutes
router.post("/", busRouteController.createBusRoute);

module.exports = router;