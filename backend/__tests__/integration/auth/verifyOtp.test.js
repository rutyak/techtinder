const app = require("../../../src/app");
const User = require("../../../src/model/user");
const { connectDB, clearDB, disconnectDB } = require("../../setup/testDB");
const request = require("supertest");

beforeEach(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe("POST /verify-otp", () => {
  it("should throw an error if email or otp undefined", async () => {
    const res = await request(app).post("/verify-otp").send({
      email: "",
      otp: 123400,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Email and OTP required");
  });

  it("should throw an error if email is invalid", async () => {
    const res = await request(app).post("/verify-otp").send({
      email: "jongmail.com",
      otp: 123400,
    });

    if (res.error) {
      console.error("error in invalid: ", res.error);
    }

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Internal server error");
  });

  it("it should return 400 if user not found", async () => {
    const res = await request(app).post("/verify-otp").send({
      email: "missing@gmail.com",
      otp: 123456,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid or expired OTP");
  });

  it("it should return 400 if otp invalid", async () => {
     const user = new User({
        firstname:"Jon",
        lastname: "Sinha",
        email: "jon@gmail.com",
        password: "Jon@1234",
        
     })
  })

  it("should verify otp successfully", async () => {
    const user = new User({
      firstname: "Jon",
      lastname: "Sinha",
      email: "jon@gmail.com",
      password: "Jon@1234",
    });
    await user.save();

    const res = await request(app).post("/verify-otp").send({
      email: "jon@gmail.com",
      otp: 123400,
    });

    if (res.error) {
      console.error("error in otp successfully: ", res.error);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "OTP verified successfully");
  });
});
