import { Request, RequestHandler } from "express";
import HttpError from "../errors/http-error.js";
import authService from "../services/auth-service.js";
import userModel from "../db/models/user.js";

const extractToken = (req: Request): string => {
  const authToken = req.header("Authorization");
  if (!authToken) {
    throw new HttpError("No authorization key", 401);
  }

  if (!authToken.toLowerCase().startsWith("bearer ")) {
    throw new HttpError("Not able to recognize authorization schema", 401);
  }

  const token = authToken.substring(7).trim();

  if (!token) {
    throw new HttpError("Empty authorization token provided", 401);
  }

  return token;
};

const validateToken: RequestHandler = async (req, res, next) => {
  const token = extractToken(req);
  const { email } = await authService.verifyJWT(token);
  const detectedUser = await userModel.findOne({ email });
  if (!detectedUser) {
    throw new HttpError("User not found", 400);
  }

  req.user = detectedUser;
  next();
};

export default validateToken;
