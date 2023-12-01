import { z } from "zod";

export const bidSchema = z.object({
    amount: z.number().default(null!),
})

export type BidSchema = typeof bidSchema;