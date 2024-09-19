const express = require('express');
const router = express.Router();
const busRouteController = require('../Controllers/busRouteController');

// Get busRoutes
router.get("/", busRouteController.getAllBusRoutes);

module.exports = router;