const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const Prisma = new PrismaClient();

// Function to initiate a payment
const initiatePayment = async (req, res) => {
  try {
    const { userId, bookingId, amount, paymentMethod } = req.body;

    // Create a payment record
    const payment = await Prisma.payment.create({
      data: {
        amount,
        paymentMethod,
        paymentDate: new Date(),
        user: { connect: { userId } }, // Associate payment with user
      },
    });

    res.status(StatusCodes.CREATED).json({ message: "Payment initiated", payment });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error initiating payment" });
  }
};

// Function to retrieve payment history for a user
const getPaymentHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch payment history for the user
    const payments = await Prisma.payment.findMany({
      where: { userId: parseInt(userId) },
    });

    res.status(StatusCodes.OK).json({ payments });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error fetching payment history" });
  }
};


module.exports = {
    initiatePayment,
    getPaymentHistory
}