const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const User = require("../../src/model/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

console.log("connection established: ", process.env.MongoDB_Test_URL);

beforeAll(async () => {
  await mongoose.connect(process.env.MongoDB_Test_URL);
});

afterEach(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /signup", () => {
  it("should create a new user successfully", async () => {
    const plainPassword = "Pon@123";

    const res = await request(app).post("/signup").send({
      firstname: "Pon",
      lastname: "Jerry",
      email: "pon@gmail.com",
      password: plainPassword,
    });

    if (res.error) {
      console.error("Supertest error: ", res.error);
    }

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Signup successfully!!");

    const user = await User.findOne({ email: "pon@gmail.com" });
    console.log("user in test: ", user ? user?.toObject() : null);
    expect(user).not.toBeNull();

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    expect(isMatch).toBe(true);
  });

  it("throw error if user already exist", async () => {
    //create new
    await request(app).post("/signup").send({
      firstname: "Rani",
      lastname: "Wakode",
      email: "rani@gmail.com",
      password: "Rani@123",
    });

    //check if exist on not
    const res = await request(app).post("/signup").send({
      firstname: "Rani",
      lastname: "Wakode",
      email: "rani@gmail.com",
      password: "Rani@123",
    });

    if (res.error) {
      console.error("Supertest Error: ", res.error);
    }

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("User already exists");
  });
});
