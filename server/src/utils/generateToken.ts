import jwt from "jsonwebtoken";
import { configureSecret } from "./configureTokenSecret";
import type { AuthJWTPayload } from "../types/auth.type";

export const generateToken = ({ id }: AuthJWTPayload) => {
  const payload = { id };

  const JWT_SECRET = configureSecret();

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "3d" });

  return token;
};
