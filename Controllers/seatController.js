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
        // Set the seats bookingId to the one provided
        bookingId
      }
    })
    res.status(StatusCodes.OK).json({message:"Seat reserved successfully!",seat});
  }catch(error){
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error reserving seat");
  }
}

// Function to release a seat (free up a previously booked seat)
const releaseSeat = async (req, res) => {
  try {
    const { seatId } = req.body;
    const seat = await Prisma.seat.update({
      where: { seatId },
      data: {
        bookingId: null, // Remove the bookingId to mark the seat as available
      },
    });
    res.status(StatusCodes.OK).json({ message: "Seat released successfully", seat });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error releasing seat");
  }
};

// Function to get seat by bookingId (retrieve seat details associated with a booking)
const getSeatByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const seat = await Prisma.seat.findMany({
      where: { bookingId: parseInt(bookingId) },
    });
    if (!seat || seat.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("No seat found for this booking");
    }
    res.status(StatusCodes.OK).json(seat);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error fetching seat by booking ID");
  }
};

module.exports = {
    getAllSeats,
    createSeat,
    bookSeat,
    releaseSeat,
    getSeatByBookingId
}