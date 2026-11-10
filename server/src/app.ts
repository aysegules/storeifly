import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/error.middleware.ts";

import authRouter from "./routes/auth.route.ts";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins?.includes(origin)) {
        cb(null, true);
        return;
      }

      cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const VERSION = process.env.VERSION || "/api/v1";

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    data: null,
  });
});

app.use(`${VERSION}/auth`, authRouter);

app.use(errorHandler);

export default app;
