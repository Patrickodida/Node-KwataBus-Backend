const Joi = require('joi');

// user Schema
const userSchema = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(10).required(),
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    mobileNumber: Joi.string().pattern(/^\d{10}$/).required()
});

// busRoute Schema
const busRouteSchema = Joi.object({
    routeId: Joi.number().integer().required(),
    departureTown: Joi.string().min(3).max(20).required(),
    arrivalTown: Joi.string().min(3).max(20).required(),
    departureTime: Joi.date().iso().required(),
    fare: Joi.number().min(1000).max(9999999)
});

// busService Schema
const busServiceSchema = Joi.object({
    busId: Joi.number().integer().required(),
    name: Joi.string().min(3).max(30).required()
});

// booking Schema
const bookingSchema = Joi.object({
    userId: Joi.number().integer().required(),
    busRouteId: Joi.number().integer().required(),
    busServiceId: Joi.number().integer().required(),
    seatIds: Joi.array().items(Joi.number().integer()).required(),
    paymentDetails: Joi.object({
        amount: Joi.number().required(),
        paymentMethod: Joi.string().required()
    }).required()
});

// seat Schema
const seatSchema = Joi.object({
    seatNumber: Joi.number().integer().required()
});

// Payment Schema
const paymentSchema = Joi.object({
    amount: Joi.number().min(1000).max(9999999),
    paymentMethod: Joi.string().min(4).max(15).required(),
    paymentDate: Joi.date().iso().required()
})

module.exports = {
    userSchema,
    busRouteSchema,
    busServiceSchema,
    bookingSchema,
    seatSchema,
    paymentSchema
}