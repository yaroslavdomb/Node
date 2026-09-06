import { z } from "zod";
import { address } from "./address";
import { name } from "./name";
import { PASS_REGEXP, ISRAEL_PHONE_REGEXP } from "./patterns";
import { image } from "./image";

export const user = z.object({
  address: address,
  email: z.email().min(5).max(256),
  name: name,
  password: z.string().min(3).max(30).regex(PASS_REGEXP),
  phone: z.string().min(3).max(15).regex(ISRAEL_PHONE_REGEXP),
  image: image,
  isBusiness: z.coerce.boolean()
});

export type User = z.infer<typeof user>;
