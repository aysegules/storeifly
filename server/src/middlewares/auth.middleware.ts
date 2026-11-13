import type { Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getToken } from "../utils/getToken";
import { AppError } from "../errors/AppError";
import { verifyToken } from "../utils/verifyToken";
import { prisma } from "../../lib/prisma";
import type { AuthRequest } from "../types/auth.type";

export const auth = asyncHandler(
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const token = getToken(req);

    if (!token) {
      throw new AppError("Not authorized", 401);
    }

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new AppError("Not authorized", 401);
    }

    req.user = user;

    next();
  },
);
