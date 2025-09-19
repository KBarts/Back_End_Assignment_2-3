import { employees, type Employee } from "../../../data/employees";

/**
 * Return all employees.
 */
export function listEmployees(): Employee[] {
  return employees;
}

/**
 * Find a single employee by id.
 */
export function getEmployeeById(id: number): Employee | undefined {
  return employees.find((e) => e.id === id);
}

