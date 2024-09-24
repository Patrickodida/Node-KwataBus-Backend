const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Prisma = new PrismaClient();

// Function to register a user
const registerUser = async (req, res) => {
  try {
    const { userName, email, password, firstName, lastName, mobileNumber } =
      req.body;

    // Check if the user already exists
    const existingUser = await Prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User already exists" });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        mobileNumber,
      },
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error registering user" });
  }
};

// Function to login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await Prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = await jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.SECRET_kEY,
      { expiresIn: "1h" }
    );

    res.status(StatusCodes.OK).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error logging in" });
  }
};

// Function to get a user Profile
const getUserProfile = async (req, res) => {
  try {
    // Get userId from the decoded JWT (set in the validateToken middleware)
    const userId = req.user.userId;

    // Find the user by ID
    const user = await Prisma.user.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching user profile" });
  }
};

// Function to Update user information
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName, email, firstName, lastName, mobileNumber } = req.body;

    // Update the user
    const updatedUser = await Prisma.user.update({
      where: { userId: parseInt(userId) },
      data: {
        userName,
        email,
        firstName,
        lastName,
        mobileNumber,
      },
    });

    res
      .status(StatusCodes.OK)
      .json({ message: "User profile updated", user: updatedUser });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating user profile" });
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete the user
    await Prisma.user.delete({
      where: { userId: parseInt(userId) },
    });

    res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting user" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
