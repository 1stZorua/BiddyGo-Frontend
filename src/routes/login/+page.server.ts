import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { loginSchema } from "$lib/schemas/login.js";
import { registerSchema } from "$lib/schemas/register.js";
import type { User } from "$lib/types/types.js";
import { sendRequest } from "$lib/functions/index.js";
import { redirect } from "sveltekit-flash-message/server";

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

        throw redirect(
            "/", 
            { type: "success", message: "Succesfully Logged in."}, 
            event
        );
    },

    register: async(event) => {
        const form = await superValidate(event, registerSchema);
        console.log(form);

        if (!form.valid) return fail(400, { form });

        const user: User = await sendRequest(`/api/User/${form.data.email}`, "GET");

        if (user) {
            return fail(400, { form });
        }
    }
}