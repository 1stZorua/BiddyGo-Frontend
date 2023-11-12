import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { bidSchema } from "$lib/schemas/bid";

export const load = async (event) => {
    const form = await superValidate(event, bidSchema);
    return { 
        form 
    };
}

export const actions = {
    bid: async (event) => {
        const form = await superValidate(event, bidSchema);
        console.log(form);

        if (!form.valid) return fail(400, { form });
    },
}