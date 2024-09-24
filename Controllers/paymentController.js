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

// Function to confirm a payment
const confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    // Find the payment first
    const payment = await Prisma.payment.findUnique({
      where: { paymentId: parseInt(paymentId) },
    });

    // If payment not found, return a 404 error
    if (!payment) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Payment not found" });
    }

    // Update the payment date to now, indicating confirmation
    const updatedPayment = await Prisma.payment.update({
      where: { paymentId: parseInt(paymentId) },
      data: {
        paymentDate: new Date(), // Set payment date to the current date/time
      },
    });

    res.status(StatusCodes.OK).json({ message: "Payment confirmed", payment: updatedPayment });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error confirming payment" });
  }
};

// Function to process refunds for cancelled bookings
const refundPayment = async (req, res) => {
  try {
    const { paymentId, amount } = req.body;

    // Process refund
    const payment = await Prisma.payment.findUnique({
      where: { paymentId: parseInt(paymentId) },
    });

    if (!payment) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Payment not found" });
    }

    // Create a refund or update the payment
    await Prisma.payment.update({
      where: { paymentId: parseInt(paymentId) },
      data: { amount: payment.amount - amount }, // Adjusting the payment amount
    });

    res.status(StatusCodes.OK).json({ message: "Refund processed successfully" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error processing refund" });
  }
};

module.exports = {
    initiatePayment,
    getPaymentHistory,
    confirmPayment,
    refundPayment
}