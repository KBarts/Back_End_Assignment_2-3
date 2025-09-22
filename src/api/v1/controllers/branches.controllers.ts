import { Request, Response } from "express"; 
import {
  listBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../services/branches.service";

/** GET /api/v1/branches */
export function getAllBranches(_req: Request, res: Response): void {
  const data: ReturnType<typeof listBranches> = listBranches();
  res.status(200).json(data);
}

/** GET /api/v1/branches/:id */
export function getBranch(req: Request, res: Response): void {
  const id: number = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid id parameter" });
    return;
  }

  const found: ReturnType<typeof getBranchById> = getBranchById(id);
  if (!found) {
    res.status(404).json({ message: "Branch not found" });
    return;
  }

  res.status(200).json(found);
}

/** POST /api/v1/branches */
export function postBranch(req: Request, res: Response): void {
  const { name, address, phone } = req.body ?? {};

  const hasAll: boolean =
    typeof name === "string" &&
    typeof address === "string" &&
    typeof phone === "string";

  if (!hasAll) {
    res.status(400).json({ message: "Missing or invalid fields" });
    return;
  }

  const created: ReturnType<typeof createBranch> = createBranch({ name, address, phone });
  res.status(201).json(created);
}

/** PATCH /api/v1/branches/:id */
export function patchBranch(req: Request, res: Response): void {
  const id: number = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid id parameter" });
    return;
  }

  const { name, address, phone } = req.body ?? {};
  const changes: Partial<{
    name: string;
    address: string;
    phone: string;
  }> = {};

  if (typeof name === "string") changes.name = name;
  if (typeof address === "string") changes.address = address;
  if (typeof phone === "string") changes.phone = phone;

  if (Object.keys(changes).length === 0) {
    res.status(400).json({ message: "No valid fields provided" });
    return;
  }

  const updated: ReturnType<typeof updateBranch> = updateBranch(id, changes);
  if (!updated) {
    res.status(404).json({ message: "Branch not found" });
    return;
  }

  res.status(200).json(updated);
}

/** DELETE /api/v1/branches/:id */
export function removeBranch(req: Request, res: Response): void {
  const id: number = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid id parameter" });
    return;
  }

  const removed: ReturnType<typeof deleteBranch> = deleteBranch(id);
  if (!removed) {
    res.status(404).json({ message: "Branch not found" });
    return;
  }

  res.status(200).json({ message: "Branch deleted" });
}
