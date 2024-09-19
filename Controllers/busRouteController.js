const { PrismaClient } = require('@prisma/client');
const { StatusCodes } =require('http-status-codes');

const Prisma = new PrismaClient();

// Function to get all bus routes
const getAllBusRoutes = async (req, res) => {
    console.log(req.query);
    try {
        // Check if the 'results' query parameter exists and is a valid number
        const limit = req.query.results ? parseInt(req.query.results) : undefined;
        const busRoutes = await Prisma.busRoute.findMany({
            // Apply limit if it is defined
            take: limit
        });
        res.status(StatusCodes.OK).json(busRoutes);
    }catch(error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error fetchng bus routes");
    }
}

// Function to post a new bus route
const createBusRoute = async (req, res) => {
    try{
        const { routeId, departureTown, arrivalTown, departureTime, fare } = req.body;
        const newBusRoutes = await Prisma.busRoute.create({
            data: {
                routeId,
                departureTown,
                arrivalTown,
                departureTime,
                fare
            }
        })
        res.status(StatusCodes.CREATED).json(newBusRoutes);
    }catch(error){
        console.error(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to create new bus route");
    }
}

// Function to retrieve a specific bus route by ID
const getBusRouteById = async (req, res) => {
    const { routeId } = req.params;
    try{
        const busRoutes = await Prisma.busRoute.findUnique({
            where: {
                routeId: parseInt(routeId)
            }
        })
        if(busRoutes){
            res.status(StatusCodes.OK).json(busRoutes);
        } else {
            res.status(StatusCodes.NOT_FOUND).send("Bus route not found");
        }
    }catch(error){
        console.error(error);
        res.status(StatusCodes.BAD_REQUEST).send("Invalid bus route format")
    }
}
module.exports = {
    getAllBusRoutes, 
    createBusRoute,
    getBusRouteById
}