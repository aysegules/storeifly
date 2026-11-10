import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  const payload = { id };

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "3d" });

  return token;
};
