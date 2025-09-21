import request from "supertest";
import app from "../src/app";

describe("POST /api/v1/branches", () => {
  it("should create a branch and return 201", async () => {
    const payload = { name: "New Branch", address: "123 Main", phone: "555-0000" };
    const res = await request(app).post("/api/v1/branches").send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toMatchObject(payload);
  });

  it("should return 400 when required fields are missing/invalid", async () => {
    const bad = { address: "No Name", phone: 123 }; // invalid phone type
    const res = await request(app).post("/api/v1/branches").send(bad);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
