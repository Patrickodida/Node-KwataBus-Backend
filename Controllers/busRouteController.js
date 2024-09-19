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


module.exports = {
    getAllBusRoutes
}