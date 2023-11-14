import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { loginSchema } from "$lib/schemas/login.js";
import { registerSchema } from "$lib/schemas/register.js";
import { sendRequest } from "$lib/functions/index.js";
import { redirect } from "sveltekit-flash-message/server";
import type { User } from "$lib/types/types.js";

export const load = async (event) => {
    const loginForm = await superValidate(event, loginSchema);
    const registerForm = await superValidate(event, registerSchema);
    return { 
        loginForm,
        registerForm 
    };
}

export const actions = {
    login: async (event) => {
        const form = await superValidate(event, loginSchema);
        console.log(form);

        if (!form.valid) return fail(400, { form });

        let token: string;

        try {
            const user: User = {
                email: form.data.email,
                password: form.data.password,
            }

            token = await sendRequest<string>(`/api/User/login`, "POST", user);
        } catch (error) {
            console.error((error as Error).message);
            if ((error as Error).message.includes("Not Found")) {
                return fail(400, { error: "Email or password is incorrect", form });
            }
            return fail(500, { error: "Internal server error", form });
        }

        console.log(token);

        throw redirect(
            "/",
            { 
                type: "success", 
                message: "Succesfully logged in."
            }, 
            event
        );
    },

    register: async(event) => {
        const form = await superValidate(event, registerSchema);
        console.log(form);

        if (!form.valid) return fail(400, { form });

        try {
            const user = await sendRequest(`/api/User/email/${form.data.email}`, "GET");
            
            if (user) {
                return fail(400, { error: "User already exists", form });
            }
        } catch (error) {
            if ((error as Error).message.includes("Not Found")) {
                const newUser = {
                    email: form.data.email,
                    password: form.data.password,
                };

                await sendRequest(`/api/User`, "POST", newUser);
            } else {
                return fail(500, { error: "Internal server error", form });
            }
        }

        throw redirect(
            "/login",
            {
                type: "success",
                message: "Successfully created account.",
            },
            event,
        );
    }
}