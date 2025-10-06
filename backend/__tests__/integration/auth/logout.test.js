const request = require("supertest");
const app = require("../../../src/app");

describe("POST /logout", () => {
  it("should clear the jwtToken cookie on logout", async () => {
    const res = await request(app).post("/logout");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Logout successfully");

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();

    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwtToken="));
    expect(jwtCookie).toBeDefined();
    expect(jwtCookie).toMatch(/jwtToken=;/);
    expect(jwtCookie).toMatch(/Expires=/);
  });
});
