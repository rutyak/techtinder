const request = require("supertest");
const app = require("../../../src/app");
const User = require("../../../src/model/user");

const bcrypt = require("bcrypt");
const { connectDB, disconnectDB, clearDB } = require("../../setup/testDB");
require("dotenv").config();

console.log("connection established: ", process.env.MongoDB_Test_URL);

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

afterEach(async () => {
  await clearDB();
});

describe("POST /signup", () => {
  it("should create a new user successfully", async () => {
    const plainPassword = "Adarsh@123";

    const res = await request(app).post("/signup").send({
      firstname: "Adarsh",
      lastname: "Jerry",
      email: "adarsh@gmail.com",
      password: plainPassword,
    });

    if (res.error) {
      console.error("Supertest error: ", res.error);
    }

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Signup successfully!!");

    const user = await User.findOne({ email: "adarsh@gmail.com" });
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
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("User already exists");
  });

  it("throw error if email is invalid", async () => {
    const res = await request(app).post("/signup").send({
      firstname: "Rani",
      lastname: "Wakode",
      email: "invalidemail",
      password: "Rani@123",
    });

    if (res.error) {
      console.error("Supertest Error: ", res.error);
    }

    expect(res.statusCode).toBe(500);
    console.log("body check : ", res.body);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Email is invalid");
  });

  it("throw error if password in not strong", async () => {
    const res = await request(app).post("/signup").send({
      firstname: "Rani",
      lastname: "Wakode",
      email: "rani@gmail.com",
      password: "rani123",
    });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe(
      "Password must be strong and at least 8 char long"
    );
  });

  it("throw error if firstname and last name is empty", async () => {
    const res = await request(app).post("/signup").send({
      firstname: "",
      lastname: "",
      email: "rani@gmail.com",
      password: "rani123",
    });

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("firstName and lastName required");
  });
});
