import request from "supertest";
import app from "../src/app";

describe("DELETE /api/v1/branches/:id", () => {
  it("should delete a branch and return 200", async () => {
    const res = await request(app).delete("/api/v1/branches/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 400 when id is not a number", async () => {
    const res = await request(app).delete("/api/v1/branches/abc");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
