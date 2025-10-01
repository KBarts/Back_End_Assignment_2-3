// test/employees.patch.test.ts
import request from "supertest";
import app from "../src/app";

describe("PATCH /api/v1/employees/:id", () => {
  it("should update an employee and return 200", async () => {
    const payload = { name: "Updated Name" };

    const res = await request(app)
      .patch("/api/v1/employees/1")
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name", "Updated Name");
  });

  it("should return 400 when no valid fields are provided", async () => {
    const res = await request(app)
      .patch("/api/v1/employees/1")
      .send({ unknown: "field" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
