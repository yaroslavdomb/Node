import { RequestHandler } from "express";
import { ZodType } from "zod";
import { user } from "../validators/user.js";
import { card } from "../validators/card.js";
import { login } from "../validators/login.js";

export function validateSchema<T>(schema: ZodType<T>): RequestHandler<any, any, T> {
  return async (req, res, next) => {
    req.body = await schema.parseAsync(req.body);
    next();
  };
}

export const validateLoginSchema = validateSchema(login);

export const validateFullUser = validateSchema(user);
export const validatePartUser = validateSchema(user.partial());

export const validateFullCard = validateSchema(card);
export const validatePartCard = validateSchema(card.partial());
