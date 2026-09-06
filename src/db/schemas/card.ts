import { z } from "zod";
import { ISRAEL_PHONE_REGEXP } from "./patterns";
import { address } from "./address";
import { image } from "./image";

export const card = z.object({
  title: z.string().min(2).max(100),
  subtitle: z.string().min(2).max(100),
  description: z.string().min(2).max(700),
  phone: z.string().min(3).max(15).regex(ISRAEL_PHONE_REGEXP),
  email: z.email().min(5).max(256),
  web: z.url().min(2).max(256),
  address: address,
  image: image
});

export type Card = z.infer<typeof card>;
