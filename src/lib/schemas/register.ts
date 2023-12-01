import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5)
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export type RegisterSchema = typeof registerSchema;