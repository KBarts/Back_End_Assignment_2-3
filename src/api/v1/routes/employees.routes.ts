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

export const employeesRouter = Router();

employeesRouter.get("/branch/:branchId", getEmployeesByBranch);
employeesRouter.get("/department/:department", getEmployeesByDepartment);

employeesRouter.get("/", getAllEmployees);
employeesRouter.get("/:id", getEmployee);
employeesRouter.post("/", postEmployee);
employeesRouter.patch("/:id", patchEmployee);
employeesRouter.delete("/:id", removeEmployee);
