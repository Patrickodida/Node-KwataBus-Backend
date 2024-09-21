const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const Prisma = new PrismaClient();

// Function to get all bus services
const getAllBusServices = async (req, res) => {
    console.log(req.query);
    try{
        // Check if the 'results' query parameter exists and is a valid number
        const limit = req.query.results ? parseInt(req.query.results) : undefined;
        const busServices = await Prisma.busService.findMany({
            // Apply limit if it is defined
            take: limit,
        })
        res.status(StatusCodes.OK).json(busServices);
    }catch(error){
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error Fetching bus services");
    }
}

module.exports = {
    getAllBusServices,
}