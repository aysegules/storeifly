import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal server error";
  const stack = err?.stack;

  console.error(`[error] - ${req.method} ${req.url} - ${stack || message}`);

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? stack : undefined,
    data: null,
  });
};
