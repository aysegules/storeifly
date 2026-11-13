import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoriesByStore,
} from "../controllers/category.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/store", getCategoriesByStore);
router.post("/", auth, createCategory);
router.delete("/:id", deleteCategory);

export default router;
