import { prisma } from "../../lib/prisma";
import { AppError } from "../errors/AppError";
import { generateToken } from "../utils/generateToken";
import { hashPassword } from "../utils/hashPassword";
import type { Register } from "../validators/auth.validator";

const register = async ({ name, email, password }: Register) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const token = generateToken(user.id);

  return { user, token };
};

export { register };
