import { z } from "zod";
export const name = z
    .object({
    first: z.string().min(2).max(100),
    last: z.string().min(2).max(100),
    middle: z.string().min(2).max(100).optional()
})
    .transform((currData) => {
    const mName = currData.middle ? ` ${currData.middle.charAt(0).toUpperCase()}. ` : ` `;
    return {
        ...currData,
        fullName: `${currData.first}${mName}${currData.last}`,
        surname: `${currData.last}`
    };
});
