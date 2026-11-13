import type { Request } from "express";
import type { User } from "../../generated/prisma/client.ts";
import type { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: Omit<User, "password">;
}

export interface AuthJWTPayload extends JwtPayload {
  id: string;
}
