const express = require('express');
const router = express.Router();
const validator = require('../Utils/joi.validator');
const { busServiceSchema } = require('../Utils/joi.schemas');
const busServicesController = require('../Controllers/busServiceController')

// Get bus services
router.get("/", busServicesController.getAllBusServices);

// Create new Bus Service
router.post("/", validator(busServiceSchema), busServicesController.createbusService);

// Get a specific bus service by busId
router.get("/:busId", busServicesController.getBusServiceByBusId);

// Update a specific bus service by busId
router.put("/:busId", busServicesController.updateBusServiceByBusId);

// Delete a specific bus service by busId
router.delete("/:busId", busServicesController.deleteBusServiceByBusId);

module.exports = router;