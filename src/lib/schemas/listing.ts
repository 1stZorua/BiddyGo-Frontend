import { z } from "zod";

export const listingSchema = z.object({
    category: z.string(),
    subCategory: z.string(),
    imageCount: z.number().min(3),
    title: z.string(),
    description: z.string(),
    shipping: z.string()
})

export type ListingSchema = typeof listingSchema;