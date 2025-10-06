const { connectDB, disconnectDB, clearDB } = require("../../setup/testDB");
const request = require("supertest");
const app = require("../../../src/app");
const User = require("../../../src/model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe("POST /login", () => {
  it("should throw error if email and password are missing", async () => {
    const res = await request(app).post("/login").send({
      email: "",
      password: "",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Email and password required");
  });

  it("should throw error if invalid credentials", async () => {
    const user = new User({
      firstname: "Yogi",
      lastname: "Adityanath",
      email: "yogi@gmail.com",
    });
    user.password = await user.hashPassword("Yogi@123");

    await user.save();

    const res = await request(app).post("/login").send({
      email: "jon@gmail.com",
      password: "Jon@123",
    });

    const userExists = await User.findOne({ email: "jon@gmail.com" });
    expect(userExists).toBeNull();

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message","Invalid credentials");
  });

  it("should throw error on wrong password", async () => {
    const user = new User({
      firstname: "Jon",
      lastname: "sinha",
      email: "jon@gmail.com",
      password: "Jon@1234",
    });

    await user.save();

    const res = await request(app).post("/login").send({
      email: "jon@gmail.com",
      password: "Tom@1234",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid password");
  });

  it("should set a jwtToken cookie on successful login", async () => {
    const user = new User({
      firstname: "Jon",
      lastname: "Sinha",
      email: "jon@gmail.com",
    });
    user.password = await user.hashPassword("Jon@1234");
    await user.save();

    const res = await request(app).post("/login").send({
      email: "jon@gmail.com",
      password: "Jon@1234",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Login successfully!!");

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain("jwtToken=");
  });
});
