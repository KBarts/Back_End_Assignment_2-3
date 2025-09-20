import { branches, type Branch } from "../../../data/branches";

/**
 * Return all branches.
 */
export function listBranches(): Branch[] {
  return branches;
}

/**
 * Find a single branch by id.
 */
export function getBranchById(id: number): Branch | undefined {
  return branches.find((b) => b.id === id);
}
