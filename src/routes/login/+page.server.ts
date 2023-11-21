import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { loginSchema } from "$lib/schemas/login.js";
import { registerSchema } from "$lib/schemas/register.js";
import { sendRequest } from "$lib/functions/index.js";
import { redirect } from "sveltekit-flash-message/server";
import type { User } from "$lib/types/types.js";

interface Auth {
    token: string
};

export const load = async (event) => {
    const { locals } = event;
    if (locals.user) {
        throw redirect(302, "/account");
    }

    const loginForm = await superValidate(event, loginSchema);
    const registerForm = await superValidate(event, registerSchema);
    return { 
        loginForm,
        registerForm 
    };
}

export const actions = {
    login: async (event) => {
        const { cookies } = event;

        const form = await superValidate(event, loginSchema);
        console.log(form);

        if (!form.valid) return fail(400, { form });

        let auth: Auth;

        try {
            const user: User = {
                email: form.data.email,
                password: form.data.password,
            }

            auth = await sendRequest<Auth, User>(`/api/User/login`, "POST", user);
        } catch (error) {
            console.error((error as Error).message);
            if ((error as Error).message.includes("Not Found")) {
                form.errors._errors = ["Wrong email or password"];
                return fail(400, { form });
            }
            form.errors._errors = ["Internal server error"];
            return fail(500, { form });
        }

        cookies.set("session", auth.token, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30,
        })

        throw redirect(
            302,
            cookies.get("intendedPage") ?? "/",
            { 
                type: "success", 
                message: "Succesfully logged in."
            }, 
            event,
        );
    },

    register: async(event) => {
        const form = await superValidate(event, registerSchema);
        console.log(form);

        if (!form.valid) return fail(400, { form });

        try {
            const user = await sendRequest(`/api/User/email/${form.data.email}`, "GET");
            
            if (user) {
                form.errors._errors = ["Email already exists"];
                return fail(400, { form });
            }
        } catch (error) {
            if ((error as Error).message.includes("Not Found")) {
                const newUser = {
                    email: form.data.email,
                    password: form.data.password,
                };

                await sendRequest(`/api/User`, "POST", newUser);
            } else {
                form.errors._errors = ["Internal server error"];
                return fail(500, { form });
            }
        }

        throw redirect(
            302,
            "/login",
            {
                type: "success",
                message: "Successfully created account.",
            },
            event,
        );
    }
}