const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const Prisma = new PrismaClient();

// Function to get all bus services
const getAllBusServices = async (req, res) => {
  console.log(req.query);
  try {
    // Check if the 'results' query parameter exists and is a valid number
    const limit = req.query.results ? parseInt(req.query.results) : undefined;
    const busServices = await Prisma.busService.findMany({
      // Apply limit if it is defined
      take: limit,
    });
    res.status(StatusCodes.OK).json(busServices);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Fetching bus services");
  }
};

// Create a bus service
const createbusService = async (req, res) => {
  try {
    const { busId, name } = req.body;
    const newBusService = await Prisma.busService.create({
      data: {
        busId,
        name,
      },
    });
    res.status(StatusCodes.CREATED).json(newBusService);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Failed to create a new bus service");
  }
};

// Function to retrieve a service by busId
const getBusServiceByBusId = async (req, res) => {
  const { busId } = req.params;
  try {
    const busService = await Prisma.busService.findUnique({
      where: {
        busId: parseInt(busId),
      },
    });
    if (busService) {
      res.status(StatusCodes.OK).json(busService);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("Bus service not found");
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .send('Invalid bus service busId format');
  }
};

module.exports = {
  getAllBusServices,
  createbusService,
  getBusServiceByBusId,
};
