import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5)
})

export type RegisterSchema = typeof registerSchema;