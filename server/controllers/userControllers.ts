import { NextFunction, Request, Response } from "express";
import {
  ActivationResponse,
  JWTSecret,
  UserRegistrationRequest,
} from "../types/interfaces";
import NaxaLMSError from "../utils/error";
import User from "../models/userModel";
import { generateActivationToken } from "../utils/utils";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, password, avatar }: UserRegistrationRequest = req.body;

    const user: UserRegistrationRequest = { email, name, password, avatar };
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next(new NaxaLMSError("User Already Exist ", 400));
    }

    const secretKey = process.env.JWT_SECRET_KEY || "MySecretKey";

    const { activationCode, token }: ActivationResponse =
      generateActivationToken(user, secretKey);
    const data = {
      user: {
        name: user.name,
      },
      activationCode,
    };
  } catch (error) {
    next(new NaxaLMSError(error.message, 500));
  }
};
