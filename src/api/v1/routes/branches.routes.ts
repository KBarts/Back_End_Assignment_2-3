import { Router } from "express";
import {
  getAllBranches,
  getBranch,
  postBranch,
  patchBranch,
  removeBranch,
} from "../controllers/branches.controllers";

// Import the validation middleware and schemas
import { validateBody } from "../middleware/validate";
import {
  branchCreateSchema,
  branchUpdateSchema,
} from "../validation/branches.schema";

const router: Router = Router();

router.get("/", getAllBranches);
router.get("/:id", getBranch);

// Apply validation to POST and PATCH routes
router.post("/", validateBody(branchCreateSchema), postBranch);
router.patch("/:id", validateBody(branchUpdateSchema), patchBranch);

router.delete("/:id", removeBranch);

export default router;
