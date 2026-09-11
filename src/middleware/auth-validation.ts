import { Request, RequestHandler } from "express";
import HttpError from "../errors/http-error";
import authService from "../services/auth-service";
import userModel from "../db/models/user";

const extractToken = (req: Request) => {
  const authToken = req.header("Authorization");
  if (authToken && authToken.toLocaleLowerCase().startsWith("bearer ")) {
    return authToken.substring(7);
  }
  throw new HttpError("Wrong authorization", 401);
};

const validateToken: RequestHandler = async (req, res, next) => {
  const token = extractToken(req);
  const { email, admin } = await authService.verifyJWT(token);
  const detectedUser = await userModel.findOne({ email });
  if (!detectedUser) {
    throw new HttpError("User not found", 400);
  }

  req.user = detectedUser;
  next();
};

export default validateToken;
