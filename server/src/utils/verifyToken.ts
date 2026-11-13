import jwt from "jsonwebtoken";
import { configureSecret } from "./configureTokenSecret";
import { AppError } from "../errors/AppError";
import type { AuthJWTPayload } from "../types/auth.type";

export const verifyToken = (token: string) => {
  const JWT_SECRET = configureSecret();

  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string" || typeof decoded.id !== "string") {
    throw new AppError("Not authorized", 401);
  }

  return decoded as AuthJWTPayload;
};
