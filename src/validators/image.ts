import { z } from "zod";

export const image = z.object({
  alt: z.string().max(256).nullish().or(z.literal("")),
  url: z.url().min(2).max(256)
});

export type Image = z.infer<typeof image>;
