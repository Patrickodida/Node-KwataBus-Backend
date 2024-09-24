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

module.exports = {
    userSchema,
    busRouteSchema,
}