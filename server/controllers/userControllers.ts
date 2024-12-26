import { NextFunction, Request, Response } from "express";
import User, { NaxaUser } from "../models/userModel";
import NaxaLMSError from "../utils/error";

interface UserRegistrationRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, avatar } = req.body as UserRegistrationRequest;
  try {
    const existingUser = User.findOne({ email });
    if (existingUser) {
      next(new NaxaLMSError("User Already Exist ", 400));
    }
  } catch (error: any) {
    next(new NaxaLMSError(error.message, 500));
  }
};
