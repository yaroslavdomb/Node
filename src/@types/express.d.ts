import { userDB } from "../db/schemas/user";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: userDB;
    }
  }
}
