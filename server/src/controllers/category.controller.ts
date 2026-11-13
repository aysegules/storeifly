import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import type { AuthRequest } from "../types/auth.type";
import * as service from "../services/category.service.ts";

const getCategoriesByStore = asyncHandler(
  async (req: Request, res: Response) => {},
);

const createCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name } = req.body as { name: string };
  const { id } = req.user as { id: string };

  const data = await service.createCategory({ id, name });

  res.status(201).json({
    success: true,
    data,
  });
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {});

export { getCategoriesByStore, createCategory, deleteCategory };
