import { z } from "zod";

export const address = z.object({
  city: z.string().min(2).max(25),
  country: z.string().min(2).max(25),
  countryCode: z.string().min(2).max(3),
  houseNumber: z.coerce.number().min(0).max(99999),
  street: z.string().min(2).max(150),
  zipCode: z.coerce.number().min(1).max(99999),
  state: z.string().nullish().or(z.literal(""))
});

export type Address = z.infer<typeof address>;
