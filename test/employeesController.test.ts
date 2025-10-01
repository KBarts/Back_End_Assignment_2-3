// test/employees.controller.test.ts
import type { Request, Response } from "express";
import {
  getAllEmployees,
  getEmployee,
  postEmployee,
  patchEmployee,
  removeEmployee,
  // added:
  getEmployeesByBranch,
  getEmployeesByDepartment,
} from "../src/api/v1/controllers/employees.controller";

// Mock the service layer so these are controller-only tests
jest.mock("../src/api/v1/services/employees.service", () => ({
  listEmployees: jest.fn(() => [
    {
      id: 1,
      name: "Alice",
      position: "Branch Manager",
      department: "Management",
      email: "a@x.com",
      phone: "111",
      branchId: 1,
    },
  ]),
  getEmployeeById: jest.fn((id: number) =>
    id === 1
      ? {
          id: 1,
          name: "Alice",
          position: "Branch Manager",
          department: "Management",
          email: "a@x.com",
          phone: "111",
          branchId: 1,
        }
      : undefined
  ),
  createEmployee: jest.fn((payload: any) => ({ id: 999, ...payload })),
  updateEmployee: jest.fn((id: number, changes: any) =>
    id === 1 ? { id: 1, ...changes } : null
  ),
  deleteEmployee: jest.fn((id: number) => id === 1),

  // corrected names to match the controller's imports
  listEmployeesByBranch: jest.fn((branchId: number) =>
    branchId === 1
      ? [
          {
            id: 2,
            name: "Bob",
            position: "Teller",
            department: "IT",
            email: "b@x.com",
            phone: "222",
            branchId: 1,
          },
        ]
      : []
  ),
  listEmployeesByDepartment: jest.fn((dept: string) =>
    dept === "IT"
      ? [
          {
            id: 3,
            name: "Carol",
            position: "Developer",
            department: "IT",
            email: "c@x.com",
            phone: "333",
            branchId: 2,
          },
        ]
      : []
  ),
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
function mockReq(
  params: Record<string, any> = {},
  body: Record<string, any> = {}
) {
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

// getAllEmployees
describe("employees.controller.getAllEmployees", () => {
  it("should return 200 and an array", () => {
    const req = mockReq();
    const res = mockRes();

    getAllEmployees(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return items that include id and name", () => {
    const req = mockReq();
    const res = mockRes();

    getAllEmployees(req, res);

    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
  });
});

// postEmployee (create)
describe("employees.controller.postEmployee", () => {
  it("should return 201 and the created employee when payload is valid", () => {
    const req = mockReq(
      {},
      {
        name: "Test User",
        position: "QA Engineer",
        department: "IT",
        email: "test@pixell-river.com",
        phone: "204-555-9999",
        branchId: 1,
      }
    );
    const res = mockRes();

    postEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "Test User");
  });

  it("should return 400 when required fields are missing/invalid", () => {
    const req = mockReq(
      {},
      {
        // name missing
        position: "QA",
        department: "IT",
        email: "bad@pixell-river.com",
        phone: "204-555-0000",
        branchId: "not-a-number",
      }
    );
    const res = mockRes();

    postEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toHaveProperty("message");
  });
});

// patchEmployee (update)
describe("employees.controller.patchEmployee", () => {
  it("should return 200 and the updated employee when id & changes are valid", () => {
    const req = mockReq({ id: "1" }, { name: "Updated Name" });
    const res = mockRes();

    patchEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name", "Updated Name");
  });

  it("should return 400 when no valid fields are provided", () => {
    const req = mockReq({ id: "1" }, { unknown: "field" });
    const res = mockRes();

    patchEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toHaveProperty("message");
  });
});

// removeEmployee (delete)
describe("employees.controller.removeEmployee", () => {
  it("should return 200 when deletion succeeds", () => {
    const req = mockReq({ id: "1" });
    const res = mockRes();

    removeEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 400 when id is not a number", () => {
    const req = mockReq({ id: "abc" });
    const res = mockRes();

    removeEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toHaveProperty("message");
  });
});

// getEmployeesByBranch
describe("employees.controller.getEmployeesByBranch", () => {
  it("should return 200 and an array for a valid branchId", () => {
    const req = mockReq({ branchId: "1" });
    const res = mockRes();

    getEmployeesByBranch(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return 400 when branchId is not a number", () => {
    const req = mockReq({ branchId: "abc" });
    const res = mockRes();

    getEmployeesByBranch(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toHaveProperty("message");
  });
});

// getEmployeesByDepartment
describe("employees.controller.getEmployeesByDepartment", () => {
  it("should return 200 and an array for a valid department", () => {
    const req = mockReq({ department: "IT" });
    const res = mockRes();

    getEmployeesByDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return 400 when department is missing/empty", () => {
    const req = mockReq({ department: "" });
    const res = mockRes();

    getEmployeesByDepartment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toHaveProperty("message");
  });
});


