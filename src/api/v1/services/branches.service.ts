import { branches, type Branch } from "../../../data/branches";

// Return all branches.
export function listBranches(): Branch[] {
  return branches;
}

// Find a single branch by id.
export function getBranchById(id: number): Branch | undefined {
  return branches.find((b) => b.id === id);
}

// Create a new branch.
export function createBranch(input: Omit<Branch, "id">): Branch {
  const nextId = branches.reduce((max, b) => (b.id > max ? b.id : max), 0) + 1;
  const created: Branch = { id: nextId, ...input };
  branches.push(created);
  return created;
}

// Update an existing branch.
export function updateBranch(
  id: number,
  changes: Partial<Omit<Branch, "id">>
): Branch | null {
  const idx = branches.findIndex((b) => b.id === id);
  if (idx === -1) return null;

  const updated: Branch = { ...branches[idx], ...changes, id: branches[idx].id };
  branches[idx] = updated;
  return updated;
}

// Delete a branch.
export function deleteBranch(id: number): boolean {
  const idx = branches.findIndex((b) => b.id === id);
  if (idx === -1) return false;

  branches.splice(idx, 1);
  return true;
}
