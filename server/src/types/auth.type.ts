import type { User } from "../../generated/prisma/client.ts";

export interface AuthRequest extends Request {
  user?: Omit<User, "password">;
}
