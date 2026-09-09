import { RequestHandler } from "express";
import { ZodType } from "zod";
import { user } from "../validators/user";
import { login } from "../validators/login";

export function validateSchema<T>(schema: ZodType<T>): RequestHandler<any, any, T> {
  return async (req, res, next) => {
    req.body = await schema.parseAsync(req.body);
    next();
  };
}

export const validateUser = validateSchema(user);
export const validateLogin = validateSchema(login);
