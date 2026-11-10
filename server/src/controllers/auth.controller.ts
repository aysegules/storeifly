import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as service from "../services/auth.service.ts";

const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const data = await service.register({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    data,
  });
});

export { register };
