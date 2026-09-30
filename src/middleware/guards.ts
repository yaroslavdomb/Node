import { type RequestHandler } from "express";
import HttpError from "../errors/http-error.js";
import validateToken from "./auth-validation.js";
import cardModel from "../db/models/card.js";

const isAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }

  return next(new HttpError("Admin privileges required", 403));
};

const isOwner: RequestHandler = (req, res, next) => {
  if (String(req.user?._id) === req.params.id) {
    return next();
  }

  return next(new HttpError("Owner privileges required", 403));
};

const isCardOwner: RequestHandler = async (req, res, next) => {
  const cardOwnerId = await cardModel.findOne({ _id: req.params.id }, { userId: 1 }).lean<{ userId: string }>();
  if (String(req.user?._id) === cardOwnerId?.userId) {
    return next();
  }

  return next(new HttpError("Card owner privileges required", 403));
};

const isOwnerOrAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.isAdmin || req.user?._id?.toString() === req.params.id) {
    return next();
  }

  return next(new HttpError("Admin/owner privileges required", 403));
};

const isBusinessUser: RequestHandler = (req, res, next) => {
  return req.user?.isBusiness ? next() : next(new HttpError("Business privileges required", 403));
};

export const hasAdminRole: RequestHandler[] = [validateToken, isAdmin];
export const hasOwnerRole: RequestHandler[] = [validateToken, isOwner];
export const hasOwnerRoleForCard: RequestHandler[] = [validateToken, isCardOwner];
export const hasOwnerOrAdminRole: RequestHandler[] = [validateToken, isOwnerOrAdmin];
export const hasBusinessRole: RequestHandler[] = [validateToken, isBusinessUser];
