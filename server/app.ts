import cookieParser from "cookie-parser";
import express, { NextFunction, Response, Request } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

const app = express();
app.use(
  express.json({
    limit: process.env.JSON_LIMIT || "50mb",
  })
);
//  Parsing Cookie Come Wit Request
app.use(cookieParser());

//  Cors
app.use(
  cors({
    origin: process.env.ORIGIN.split(",") || "*",
    credentials: true,
  })
);

app.get("/api-test", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API Working Successfully",
  });
});
//  Not Found Route

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  let err = new Error(`${req.originalUrl} Not Found`) as any;
  err.statusCode = 404;

  next(err);
});

export default app;
