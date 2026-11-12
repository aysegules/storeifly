import { prisma } from "../../lib/prisma";
import { AppError } from "../errors/AppError";
import { generateToken } from "../utils/generateToken";
import { hashPassword } from "../utils/hashPassword";
import type { Login, Register } from "../validators/auth.validator";
import bcrypt from "bcrypt";

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

const login = async ({ email, password }: Login) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(existingUser.id);

  const { password: _, ...user } = existingUser;

  return { user, token };
};

export { register, login };
