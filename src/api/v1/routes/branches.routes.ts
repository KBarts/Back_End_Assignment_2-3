import { Router } from "express";
import {
  getAllBranches,
  getBranch,
  postBranch,
  patchBranch,
  removeBranch,
} from "../controllers/branches.controllers";

const router = Router();

router.get("/", getAllBranches);
router.get("/:id", getBranch);
router.post("/", postBranch);
router.patch("/:id", patchBranch);
router.delete("/:id", removeBranch);

export default router;
