const express = require("express");
const paymentRouter = express.Router();
const userAuth = require("../middleware/userAuth");
const {
  createOrder,
  webhook,
  paymentVerification,
} = require("../controller/paymentController");
require("dotenv").config();

paymentRouter.post("/order/create", userAuth, createOrder);

paymentRouter.post("/payment/webhook", webhook);

paymentRouter.get("/premium/verification", userAuth, paymentVerification);

module.exports = paymentRouter;
