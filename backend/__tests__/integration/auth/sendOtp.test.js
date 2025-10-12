jest.mock("nodemailer");
const sendMailMock = jest.fn();
const nodemailer = require("nodemailer");
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

// why import last? becuase mock will replace real nodemailer
const app = require("../../../src/app");
const User = require("../../../src/model/user");
const { connectDB, clearDB, disconnectDB } = require("../../setup/testDB");
const request = require("supertest");

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe("POST /send-otp", () => {
  it("should throw an error if send otp button click without email", async () => {
    const res = await request(app).post("/send-otp").send({
      email: "",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Email is required");
  });

  it("should throw an error if email is not registered", async () => {
    const res = await request(app).post("/send-otp").send({
      email: "jon@gmail.com",
    });

    const user = await User.findOne({ email: "jon@gmail.com" });
    expect(user).toBeNull();

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "User not found");
  });

  it("should send an otp to the user's email", async () => {
    const user = new User({
      firstname: "Jon",
      lastname: "Sinha",
      email: "jon@gmail.com",
      password: "Jon@1234",
    });
    await user.save();

    const res = await request(app).post("/send-otp").send({
      email: "jon@gmail.com",
    });

    if (res.error) {
      console.error("error in send otp: ", res.error);
    }

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "OTP sent successfully");

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "jon@gmail.com",
        subject: expect.stringContaining("OTP"),
      })
    );
  });
});
