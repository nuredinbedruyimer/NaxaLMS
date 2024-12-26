import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ActivationResponse, User } from "../types/interfaces";

export function generateActivationToken(
  user: User,
  secretKey: string
): ActivationResponse {
  const activationCode = crypto.randomInt(100000, 999999).toString();

  const payload = {
    email: user.email,
    name: user.name,
    activationCode: activationCode,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return {
    activationCode,
    token,
  };
}
