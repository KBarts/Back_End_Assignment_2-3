import request from "supertest";
import app from "../src/app";

describe("POST /api/v1/employees", () => {
  it("should create an employee and return 201", async () => {
    const payload = {
      name: "Test User",
      position: "QA Engineer",
      department: "IT",
      email: "test.user@pixell-river.com",
      phone: "204-555-9999",
      branchId: 1,
    };

    const res = await request(app).post("/api/v1/employees").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toMatchObject(payload);
  });

  it("should return 400 when required fields are missing/invalid", async () => {
    const badPayload = {
      // name missing
      position: "QA",
      department: "IT",
      email: "bad@pixell-river.com",
      phone: "204-555-0000",
      branchId: "not-a-number", // invalid type
    };

    const res = await request(app).post("/api/v1/employees").send(badPayload);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});

