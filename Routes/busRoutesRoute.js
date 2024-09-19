const express = require('express');
const router = express.Router();
const busRouteController = require('../Controllers/busRouteController');

// Get busRoutes
router.get("/", busRouteController.getAllBusRoutes);

// Create busRoutes
router.post("/", busRouteController.createBusRoute);

// Get a specific busRoute by routeId
router.get("/:routeId", busRouteController.getBusRouteById);

// Update busRoute by routeId
router.put("/:routeId", busRouteController.updateBusRouteByRouteId);
module.exports = router;