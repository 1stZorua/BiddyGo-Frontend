import { z } from "zod";

export const listingSchema = z.object({
    categoryId: z.number(),
    subCategoryId: z.number(),
    imageCount: z.number().min(3),
    title: z.string(),
    description: z.string(),
    shipping: z.string()
})

export type ListingSchema = typeof listingSchema;