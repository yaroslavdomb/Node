import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import envConfig from "../config/env.config.js";
const authService = {
    hashPassword: (plainPassword, rounds = 12) => {
        return bcrypt.hash(plainPassword, rounds);
    },
    validatePassword: (plainPassword, hashedPassword) => {
        return bcrypt.compare(plainPassword, hashedPassword);
    },
    generateJWT: (payload) => {
        const secret = new TextEncoder().encode(envConfig.JWT_SECRET);
        return new SignJWT({ ...payload })
            .setProtectedHeader({ alg: "HS256", typ: "at+JWT" })
            .setExpirationTime(envConfig.JWT_VALID_TIME)
            .setIssuedAt()
            .sign(secret);
    },
    verifyJWT: (token) => {
        const secret = new TextEncoder().encode(envConfig.JWT_SECRET);
        return jwtVerify(token, secret).then((result) => result.payload);
    }
};
export default authService;
