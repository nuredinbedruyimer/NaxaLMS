export interface User {
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

export interface ActivationResponse {
  activationCode: string;
  token: string;
}

export interface UserRegistrationRequest {
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

export interface JWTSecret {
  JWT_SECRET_KEY: string;
}
