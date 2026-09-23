import bcrypt from "bcrypt";
import { SignJWT, JWTPayload, jwtVerify } from "jose";
import envConfig from "../config/env.config";

const authService = {
  hashPassword: (plainPassword: string, rounds: number = 12) => {
    return bcrypt.hash(plainPassword, rounds);
  },

  validatePassword: (plainPassword: string, hashedPassword: string) => {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  generateJWT: (payload: JWTPayload) => {
    const secret = new TextEncoder().encode(envConfig.JWT_SECRET);
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: "HS256", typ: "at+JWT" })
      .setExpirationTime(envConfig.JWT_VALID_TIME)
      .setIssuedAt()
      .sign(secret);
  },

  verifyJWT: (token: string) => {
    const secret = new TextEncoder().encode(envConfig.JWT_SECRET);
    return jwtVerify(token, secret).then((result) => result.payload);
  }
};

export default authService;
