const User = require("../model/user");
const validateSignup = require("../utils/validateSignup");
const validatePassword = require("../utils/validatePassword");
const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("ENV check:", {
  user: process.env.EMAIL_USER ? "Set" : "NOT SET",
  pass: process.env.EMAIL_PASS ? "Set" : "NOT SET",
  node_env: process.env.NODE_ENV,
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function signUp(req, res) {
  try {
    //validation
    validateSignup(req);
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const tempUser = new User();
    const passwordHash = await tempUser.hashPassword(password);

    await User.create({ ...req.body, password: passwordHash });
    res.status(201).json({ message: "Signup successfully!!" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await user.passwordCompare(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = await user.generateAuthToken();

    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({ message: "Login successfully!!", user });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}

function logout(req, res) {
  res.cookie("jwtToken", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logout successfully" });
}

async function sendOtp(req, res) {
  try {
    await transporter.verify(function (error, success) {
      if (error) {
        console.log("SMIP Verification FAILED: ", error);
        throw error;
      } else {
        console.log("SMIP server is ready to take our message");
      }
    });

    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 10000;

    user.resetOtp = otp;
    user.resetOtpExpiry = expiry;
    await user.save();

    await transporter.sendMail({
      from: `"ConnectEdge Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
}

async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const user = await User.findOne({ email });
    if (
      !user ||
      user.resetOtp !== otp ||
      !user.resetOtpExpiry ||
      user.resetOtpExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
}

async function resetPassword(req, res) {
  try {
    validatePassword(req);

    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //hashPass
    const passwordHash = await user.hashPassword(password);

    await User.updateOne(
      { email },
      { password: passwordHash },
      { new: true, runValidators: true }
    );

    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email: req.user.email }).select(
      "+password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await user.passwordCompare(oldPassword);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const hashPassword = await user.hashPassword(newPassword);

    user.password = hashPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error?.message });
  }
}

module.exports = {
  signUp,
  login,
  logout,
  sendOtp,
  verifyOtp,
  resetPassword,
  changePassword,
};
