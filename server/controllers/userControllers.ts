import { NextFunction, Request, Response } from "express";
import {
  ActivationResponse,
  JWTSecret,
  User,
  UserRegistrationRequest,
} from "../types/interfaces";
import NaxaLMSError from "../utils/error";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, password, avatar }: UserRegistrationRequest = req.body;

    const user: User = { email, name, password, avatar };

    const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key";

    const { activationCode, token }: ActivationResponse =
      generateActivationToken(user, secretKey);

    res
      .status(200)
      .json({ message: "Registration successful", activationCode, token });
  } catch (error) {
    next(new NaxaLMSError(error.message, 500));
  }
};
