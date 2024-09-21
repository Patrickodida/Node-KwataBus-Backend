const express = require('express');
const router = express.Router();
const validator = require('../Utils/joi.validator');
const { busRouteSchema } = require('../Utils/joi.schemas');
const busRouteController = require('../Controllers/busRouteController');

// Get busRoutes
router.get("/", busRouteController.getAllBusRoutes);

// Create busRoutes
router.post("/", validator(busRouteSchema), busRouteController.createBusRoute);

// Get a specific busRoute by routeId
router.get("/:routeId", busRouteController.getBusRouteById);

// Update busRoute by routeId
router.put("/:routeId", busRouteController.updateBusRouteByRouteId);

// Delete busRoute by routeId
router.delete("/:routeId", busRouteController.deleteBusRouteByRouteId);

module.exports = router;