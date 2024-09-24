const express = require('express');
const router = express.Router();
const validator = require('../Utils/joi.validator');
const { busRouteSchema } = require('../Utils/joi.schemas');
const paymentController = require('../Controllers/paymentController');

// Initiate payment
router.post("/initiate", paymentController.initiatePayment);

// Retrieve payment history
router.get("/history/:userId", paymentController.getPaymentHistory);

module.exports = router;

