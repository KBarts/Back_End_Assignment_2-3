import request from "supertest";
import app from "../src/app";

describe("GET /api/v1/branches/:id", () => {
  it("should return 200 and the branch when id is valid", async () => {
    const res = await request(app).get("/api/v1/branches/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name");
  });

  it("should return 400 when id is not a number", async () => {
    const res = await request(app).get("/api/v1/branches/abc");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
