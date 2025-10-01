import request from "supertest";
import app from "../src/app";

describe("DELETE /api/v1/employees/:id", () => {
  it("should delete an employee and return 200", async () => {
    // delete a known id from the seed data
    const res = await request(app).delete("/api/v1/employees/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 400 when id is not a number", async () => {
    const res = await request(app).delete("/api/v1/employees/abc");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
