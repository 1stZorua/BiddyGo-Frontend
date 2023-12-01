import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password can't be empty"),
})

export type LoginSchema = typeof loginSchema;