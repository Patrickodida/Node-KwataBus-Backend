const express = require('express');
const router = express.Router();
const validator = require('../Utils/joi.validator');
const { busRouteSchema } = require('../Utils/joi.schemas');
const busServicesController = require('../Controllers/busServiceController')

// Get bus services
router.get("/", busServicesController.getAllBusServices);

// Create new Bus Service
router.post("/", busServicesController.createbusService);

// Get a specific bus service by busId
router.get("/:busId", busServicesController.getBusServiceByBusId);

// Update a specific bus service by busId
router.put("/:busId", busServicesController.updateBusServiceByBusId);

module.exports = router;