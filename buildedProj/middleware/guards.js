import HttpError from "../errors/http-error.js";
import validateToken from "./auth-validation.js";
import cardModel from "../db/models/card.js";
const isAdmin = (req, res, next) => {
    if (req.user?.isAdmin) {
        return next();
    }
    return next(new HttpError("Admin privileges required", 403));
};
const isOwner = (req, res, next) => {
    if (String(req.user?._id) === req.params.id) {
        return next();
    }
    return next(new HttpError("Owner privileges required", 403));
};
const isCardOwner = async (req, res, next) => {
    const cardOwnerId = await cardModel.findOne({ _id: req.params.id }, { userId: 1 }).lean();
    if (String(req.user?._id) === cardOwnerId?.userId) {
        return next();
    }
    return next(new HttpError("Card owner privileges required", 403));
};
const isOwnerOrAdmin = (req, res, next) => {
    if (req.user?.isAdmin || req.user?._id?.toString() === req.params.id) {
        return next();
    }
    return next(new HttpError("Admin/owner privileges required", 403));
};
const isBusinessUser = (req, res, next) => {
    return req.user?.isBusiness ? next() : next(new HttpError("Business privileges required", 403));
};
export const hasAdminRole = [validateToken, isAdmin];
export const hasOwnerRole = [validateToken, isOwner];
export const hasOwnerRoleForCard = [validateToken, isCardOwner];
export const hasOwnerOrAdminRole = [validateToken, isOwnerOrAdmin];
export const hasBusinessRole = [validateToken, isBusinessUser];
