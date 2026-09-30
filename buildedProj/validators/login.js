import { user } from "./user.js";
export const login = user.pick({
    email: true,
    password: true
});
