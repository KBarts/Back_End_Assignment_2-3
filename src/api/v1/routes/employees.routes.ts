import { Router } from "express";
import {
  getAllEmployees,
  getEmployee,
  postEmployee,
  patchEmployee,
  removeEmployee,
  getEmployeesByBranch,
  getEmployeesByDepartment,
} from "../controllers/employees.controller";

// Import the validation middleware and schemas
import { validateBody } from "../middleware/validate";
import {
  employeeCreateSchema,
  employeeUpdateSchema,
} from "../validation/employees.schema";

export const employeesRouter: Router = Router();

employeesRouter.get("/branch/:branchId", getEmployeesByBranch);
employeesRouter.get("/department/:department", getEmployeesByDepartment);

employeesRouter.get("/", getAllEmployees);
employeesRouter.get("/:id", getEmployee);

// Apply validation to POST and PATCH routes
employeesRouter.post("/", validateBody(employeeCreateSchema), postEmployee);
employeesRouter.patch("/:id", validateBody(employeeUpdateSchema), patchEmployee);

employeesRouter.delete("/:id", removeEmployee);

