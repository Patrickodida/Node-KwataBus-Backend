const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../Controllers/userController.js");
const validateToken = require("../Utils/validateToken.js");
const validateRequest = require("../Utils/joi.validator.js");
const { userSchema } = require("../Utils/joi.schemas.js");
const router = express.Router();

// Get User profile
router.get("/profile", validateToken, getUserProfile);

// Register User
router.post("/register", validateRequest(userSchema), registerUser);

// Login user
router.post("/login", loginUser);

// Update User Profile
router.put("/profile/:userId", validateToken, updateUserProfile);

// Delete user profile
router.delete("/profile/:userId", validateToken, deleteUser);

module.exports = router;
