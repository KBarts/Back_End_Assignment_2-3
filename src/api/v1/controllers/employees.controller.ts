import { Request, Response } from "express";
import {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  // NEW
  listEmployeesByBranch,
  listEmployeesByDepartment,
} from "../services/employees.service";

/** GET /api/v1/employees */
export function getAllEmployees(_req: Request, res: Response): void {
  const data = listEmployees();
  res.status(200).json(data);
}

/** GET /api/v1/employees/:id */
export function getEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid id parameter" });
    return;
  }
  const found = getEmployeeById(id);
  if (!found) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }
  res.status(200).json(found);
}

/** POST /api/v1/employees */
export function postEmployee(req: Request, res: Response): void {
  const { name, position, department, email, phone, branchId } = req.body ?? {};

  const hasAll =
    typeof name === "string" &&
    typeof position === "string" &&
    typeof department === "string" &&
    typeof email === "string" &&
    typeof phone === "string" &&
    typeof branchId === "number";

  if (!hasAll) {
    res.status(400).json({ message: "Missing or invalid fields" });
    return;
  }

  const created = createEmployee({
    name,
    position,
    department,
    email,
    phone,
    branchId,
  });

  res.status(201).json(created);
}

/** PATCH /api/v1/employees/:id */
export function patchEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid id parameter" });
    return;
  }

  const { name, position, department, email, phone, branchId } = req.body ?? {};
  const changes: Partial<{
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: number;
  }> = {};

  if (typeof name === "string") changes.name = name;
  if (typeof position === "string") changes.position = position;
  if (typeof department === "string") changes.department = department;
  if (typeof email === "string") changes.email = email;
  if (typeof phone === "string") changes.phone = phone;
  if (typeof branchId === "number") changes.branchId = branchId;

  if (Object.keys(changes).length === 0) {
    res.status(400).json({ message: "No valid fields provided" });
    return;
  }

  const updated = updateEmployee(id, changes);
  if (!updated) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json(updated);
}

/** DELETE /api/v1/employees/:id */
export function removeEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid id parameter" });
    return;
  }

  const removed = deleteEmployee(id);
  if (!removed) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json({ message: "Employee deleted" });
}

/** GET /api/v1/employees/branch/:branchId */
export function getEmployeesByBranch(req: Request, res: Response): void {
  const branchId = Number(req.params.branchId);
  if (Number.isNaN(branchId)) {
    res.status(400).json({ message: "Invalid branchId parameter" });
    return;
  }
  const data = listEmployeesByBranch(branchId);
  res.status(200).json(data);
}

/** GET /api/v1/employees/department/:department */
export function getEmployeesByDepartment(req: Request, res: Response): void {
  const department = String(req.params.department ?? "").trim();
  if (!department) {
    res.status(400).json({ message: "Missing department parameter" });
    return;
  }
  const data = listEmployeesByDepartment(department);
  res.status(200).json(data);
}
