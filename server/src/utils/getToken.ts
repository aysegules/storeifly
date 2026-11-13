import type { Request } from "express";

export const getToken = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const [_, token] = req.headers.authorization.split(" ");

    return token;
  } else if (Object.keys(req.cookies).includes("jwt")) {
    return req.cookies.jwt;
  }

  return null;
};
