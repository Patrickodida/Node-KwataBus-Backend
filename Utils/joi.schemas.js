const Joi = require('joi');

// busRoute Schema
const busRouteSchema = Joi.object({
    routeId: Joi.number().integer().required(),
    departureTown: Joi.string().min(3).max(20).required(),
    arrivalTown: Joi.string().min(3).max(20).required(),
    departureTime: Joi.date().iso().required(),
    fare: Joi.number().min(1000).max(9999999)
});

module.exports = {
    busRouteSchema,
}