import "dotenv/config";
import express, { type Request, type Response } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const VERSION = process.env.VERSION || "/api/v1";

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    data: null,
  });
});

export default app;
