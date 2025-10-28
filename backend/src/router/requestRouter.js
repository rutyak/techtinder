const express = require("express");
const userAuth = require("../middleware/userAuth");
const {
  requestReview,
  requestSend,
} = require("../controller/requestController");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:id", userAuth, requestSend);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  requestReview
);

module.exports = requestRouter;
