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
const passport = require("passport");
const authRouter = express.Router();

authRouter.post("/signup", signUp);

authRouter.post("/login", login);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // Generate JWT after successful login
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Redirect back to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  }
);

authRouter.post("/logout", logout);

authRouter.post("/send-otp", sendOtp);

authRouter.post("/verify-otp", verifyOtp);

authRouter.patch("/reset-password", resetPassword);

authRouter.patch("/change-password", userAuth, changePassword);

module.exports = authRouter;
