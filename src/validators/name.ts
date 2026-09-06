import { z } from "zod";

export const name = z
  .object({
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    middleName: z.string().min(2).max(100).optional()
  })
  .transform((currData) => {
    const mName = currData.middleName ? ` ${currData.middleName.charAt(0).toUpperCase()}. ` : ` `;

    return {
      ...currData,
      fullName: `${currData.firstName}${mName}${currData.lastName}`,
      surname: `${currData.lastName}`
    };
  });

export type inName = z.input<typeof name>;
export type outName = z.output<typeof name>;
