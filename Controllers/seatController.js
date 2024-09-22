const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const Prisma = new PrismaClient();

// Function to get all seats
const getAllSeats = async (req, res) => {
  console.log(req.query);
  try {
    // Check if the 'results' query parameter exists and is a valid number
    const limit = req.query.results ? parseInt(req.query.results) : undefined;
    const seats = await Prisma.seat.findMany({
      // Apply limit if it is defined
      take: limit,
    });
    res.status(StatusCodes.OK).json(seats);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error fetchng bus seats");
  }
};

// Function to create new seat
const createSeat = async (req, res)=>{
    try{
        const { seatNumber } = req.body;
        const newSeat = await Prisma.seat.create({
            data:{
                seatNumber
            }
        })
        console.log(newSeat)
        res.status(StatusCodes.CREATED).json(newSeat);
    }catch(error){
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to create a new seat");
    }
}

// Function to book a seat (reserve a specific seat for a booking)
const bookSeat = async (req, res)=>{
  try{
    const { seatId, bookingId } = req.body;
    const seat = await Prisma.seat.update({
      where:{
        seatId
      },
      data:{
        // Seat the seats bookingId to the one provided
        bookingId
      }
    })
    res.status(StatusCodes.OK).json({message:"Seat reserved successfully!",seat});
  }catch(error){
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error reserving seat");
  }
}

module.exports = {
    getAllSeats,
    createSeat,
    bookSeat,
}