// test/employeeController.test.ts
import type { Request, Response } from "express";
import {
  getAllEmployees,
  getEmployee,
  postEmployee,
  patchEmployee,
  removeEmployee,
} from "../src/api/v1/controllers/employees.controller";

// Mock the service layer so these are controller-only tests.
jest.mock("../src/api/v1/services/employees.service", () => ({
  listEmployees: jest.fn(() => [
    { id: 1, name: "Alice", position: "Branch Manager", department: "Management", email: "a@x.com", phone: "111", branchId: 1 },
  ]),
  getEmployeeById: jest.fn((id: number) =>
    id === 1
      ? { id: 1, name: "Alice", position: "Branch Manager", department: "Management", email: "a@x.com", phone: "111", branchId: 1 }
      : undefined
  ),
  createEmployee: jest.fn((payload: any) => ({ id: 999, ...payload })),
  updateEmployee: jest.fn((id: number, changes: any) =>
    id === 1 ? { id: 1, ...changes } : null
  ),
  deleteEmployee: jest.fn((id: number) => id === 1),
}));

// Minimal req/res helpers
function mockRes() {
  const res = {
    statusCode: 200,
    body: undefined as any,
    status: jest.fn(function (this: any, code: number) {
      this.statusCode = code;
      return this;
    }),
    json: jest.fn(function (this: any, data: unknown) {
      this.body = data;
      return this;
    }),
    send: jest.fn(function (this: any, data: unknown) {
      this.body = data;
      return this;
    }),
  } as unknown as Response & { statusCode: number; body: any };
  return res;
}
function mockReq(params: Record<string, any> = {}, body: Record<string, any> = {}) {
  return { params, body } as unknown as Request;
}

// getEmployee controller
describe("employees.controller.getEmployee", () => {
  it("should return 200 and the employee when id is valid", () => {
    const req = mockReq({ id: "1" });
    const res = mockRes();

    getEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name");
  });

  it("should return 400 when id is not a number", () => {
    const req = mockReq({ id: "abc" });
    const res = mockRes();

    getEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toHaveProperty("message");
  });
});

