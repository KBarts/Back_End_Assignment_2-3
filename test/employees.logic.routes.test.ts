import request from "supertest";
import app from "../src/app";

describe("Employees logical routes", () => {
  it("GET /api/v1/employees/branch/:branchId returns 200 and an array", async () => {
    const res = await request(app).get("/api/v1/employees/branch/1");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/v1/employees/department/:department returns 200 and an array", async () => {
    const res = await request(app).get("/api/v1/employees/department/IT");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
