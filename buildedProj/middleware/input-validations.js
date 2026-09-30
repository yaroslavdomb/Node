import { user } from "../validators/user.js";
import { card } from "../validators/card.js";
import { login } from "../validators/login.js";
export function validateSchema(schema) {
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
