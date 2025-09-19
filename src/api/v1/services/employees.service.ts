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

/**
 * Create a new employee (in memory).
 */
export function createEmployee(
  input: Omit<Employee, "id">
): Employee {
  const nextId =
    employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;

  const created: Employee = { id: nextId, ...input };
  employees.push(created);
  return created;
}

/**
 * Update an employee by id (patch fields).
 */
export function updateEmployee(
  id: number,
  changes: Partial<Omit<Employee, "id">>
): Employee | undefined {
  const idx = employees.findIndex((e) => e.id === id);
  if (idx === -1) return undefined;

  employees[idx] = { ...employees[idx], ...changes, id };
  return employees[idx];
}

/**
 * Delete an employee by id.
 */
export function deleteEmployee(id: number): boolean {
  const idx = employees.findIndex((e) => e.id === id);
  if (idx === -1) return false;

  employees.splice(idx, 1);
  return true;
}

