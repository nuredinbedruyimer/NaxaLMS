import { Request, Response, NextFunction } from "express";
import NaxaLMSError from "../utils/error"; // Assuming NaxaLMSError is a custom error class

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message + "Added Here" || "Internal Server Error !!!";
  err.statusCode = err.statusCode || 500;

  console.log("I am The Middle Ware");

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]; // Extract the field that caused the duplication
    const message = `Duplicate value found for ${field}. Please provide a unique value.`;
    err = new NaxaLMSError(message, 400); // Bad request (due to duplication)
  }

  if (err.name === "CastError") {
    let message = `Resource Not Found. Invalid value for path: ${err.path}`;
    err = new NaxaLMSError(message, 400); // Bad request
  }

  if (err.name === "ValidationError") {
    let message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(", ");
    err = new NaxaLMSError(`Validation failed: ${message}`, 400);
  }

  if (err.name === "JsonWebTokenError") {
    err = new NaxaLMSError("Invalid or expired token.", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new NaxaLMSError("Token has expired. Please login again.", 401);
  }

  if (err.name === "UnauthorizedError") {
    err = new NaxaLMSError("Unauthorized access.", 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorMiddleware;
