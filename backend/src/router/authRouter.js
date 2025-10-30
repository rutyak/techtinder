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
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

authRouter.post("/signup", signUp);

authRouter.post("/login", login);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    try {
      const user = req.user;
      console.log("user in final google call: ", user);

      const token = await user.generateAuthToken();

      res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const redirectURL =
        process.env.NODE_ENV === "production"
          ? `${process.env.CLIENT_URL}/dashboard`
          : `${process.env.CLIENT_URL_LOCAL}/dashboard`;

      const query = new URLSearchParams({
        user: JSON.stringify(user),
      }).toString();

      res.redirect(`${redirectURL}?${query}`);
    } catch (error) {
      console.error("Error setting token:", error);
      res.redirect("/login");
    }
  }
);

authRouter.post("/logout", logout);

authRouter.post("/send-otp", sendOtp);

authRouter.post("/verify-otp", verifyOtp);

authRouter.patch("/reset-password", resetPassword);

authRouter.patch("/change-password", userAuth, changePassword);

module.exports = authRouter;
