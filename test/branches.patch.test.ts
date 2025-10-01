import request from "supertest";
import app from "../src/app";

describe("PATCH /api/v1/branches/:id", () => {
  it("should update a branch and return 200", async () => {
    const res = await request(app)
      .patch("/api/v1/branches/1")
      .send({ name: "Updated Branch" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name", "Updated Branch");
  });

  it("should return 400 when no valid fields are provided", async () => {
    const res = await request(app).patch("/api/v1/branches/1").send({ foo: "bar" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
