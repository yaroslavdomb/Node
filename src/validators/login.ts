import { user } from "./user.js";
import { z } from "zod";

export const login = user.pick({
  email: true,
  password: true
});

export type Login = z.infer<typeof login>;
