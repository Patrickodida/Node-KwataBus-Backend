const express = require('express');
const router = express.Router();
const validator = require('../Utils/joi.validator');
const { busRouteSchema } = require('../Utils/joi.schemas');
const busServicesController = require('../Controllers/busServiceController')

// Get bus services
router.get("/", busServicesController.getAllBusServices);

module.exports = router;