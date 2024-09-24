const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const Prisma = new PrismaClient();

// Function to create booking with user, seat, and payment deatils
const createBooking = async (req, res) => {
  try {
    const { userId, busRouteId, busServiceId, seatIds, paymentDetails } =
      req.body;

      // Validate that userId is present and valid
    if (!userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("User ID is required.");
    }
    
      // Check if the user exists
    const userExists = await Prisma.user.findUnique({
      where: {
        userId: userId, // ensure userId is valid and exists
      },
    });

    if (!userExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("User does not exist. Please provide a valid userId.");
    }
    
    // Create a new booking
    const newBooking = await Prisma.booking.create({
      data: {
        userId,
        busRouteId,
        busServiceId,
        seats: {
          connect: seatIds.map((seatId) => ({ seatId })),
        },
      },
    });

    // Create payment details for a bookig
    const newPayment = await Prisma.payment.create({
      data: {
        amount: paymentDetails.amount,
        paymentMethod: paymentDetails.paymentMethod,
        paymentDate: new Date(),
        userId,
      },
    });
    res
      .status(StatusCodes.CREATED)
      .json({ booking: newBooking, payment: newPayment });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error processing booking request");
  }
};

// Function to get booking by id
const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Prisma.booking.findUnique({
      where: {
        bookingId: parseInt(bookingId),
      },
      include: { seats: true, BusRoute: true, busService: true, user: true },
    });
    if (!booking) {
      res.status(StatusCodes.NOT_FOUND).send("Booking not found");
    }
    res.status(StatusCodes.OK).json(booking);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error retrieving booking");
  }
};

// Function to get all booking for a user
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Prisma.booking.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: { seats: true, BusRoute: true, busService: true },
    });
    if (!bookings.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("No bookings found for this user");
    }
    res.status(StatusCodes.OK).json(bookings);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error retrieving user bookings");
  }
};

// Function to Update bookings
const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { busRouteId, busServiceId, seatIds } = req.body;
    const updatedBooking = await Prisma.booking.update({
      where: {
        bookingId: parseInt(bookingId),
      },
      data: {
        busRouteId,
        busServiceId,
        seats: {
          set: seatIds.map((seatId) => ({ seatId })), // Reassign seats
        },
      },
    });
    res.status(StatusCodes.OK).json(updatedBooking);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error updating booking");
  }
};

// Function to cancel booking
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const deletedBooking = await Prisma.booking.delete({
      where: {
        bookingId: parseInt(bookingId),
      },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: "Booking canceled!", booking: deletedBooking });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error canceling booking");
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getUserBookings,
  updateBooking,
  cancelBooking,
};
