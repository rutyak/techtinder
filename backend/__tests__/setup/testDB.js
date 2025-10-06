const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const User = require("../../src/model/user");

let mongoServer;

async function connectDB() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}

async function disconnectDB() {
  await mongoose.disconnect();
  await mongoServer.stop();
}

async function clearDB() {
  await User.deleteMany({});
}

module.exports = { connectDB, disconnectDB, clearDB };
