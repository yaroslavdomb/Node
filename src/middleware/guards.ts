import { type RequestHandler } from "express";
import HttpError from "../errors/http-error";
import validateToken from "./auth-validation";

const isAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }

  return next(new HttpError("Has no admin privilieges", 403));
};

const isOwnerOrAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.isAdmin || req.user?._id?.toString() === req.params.id) {
    return next();
  }

  return next(new HttpError("Has no admin/owner privilieges", 403));
};

export const hasAdminRole: RequestHandler[] = [validateToken, isAdmin];
export const hasOwnerOrAdminRole: RequestHandler[] = [validateToken, isOwnerOrAdmin];
