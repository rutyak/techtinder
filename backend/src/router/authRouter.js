const express = require("express");
const userAuth = require("../middleware/userAuth");
const {
  signUp,
  login,
  logout,
  sendOtp,
  verifyOtp,
  resetPassword,
  changePassword,
} = require("../controller/authController");
const authRouter = express.Router();

authRouter.post("/signup", signUp);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/send-otp", sendOtp);

authRouter.post("/verify-otp", verifyOtp);

authRouter.patch("/reset-password", resetPassword);

authRouter.patch("/change-password", userAuth, changePassword);

module.exports = authRouter;
