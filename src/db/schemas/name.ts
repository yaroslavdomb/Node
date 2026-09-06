import { z } from "zod";

export const name = z
  .object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    middleName: z.string().min(1).max(100).optional()
  })
  .transform((currData) => {
    const mName = currData.middleName ? ` ${currData.middleName.charAt(0).toUpperCase()}. ` : ` `;

    return {
      ...currData,
      fullName: `${currData.firstName}${mName}${currData.lastName}`,
      surname: `${currData.lastName}`
    };
  });

export type Name = z.infer<typeof name>;
