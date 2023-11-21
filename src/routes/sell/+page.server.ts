import { fail } from "@sveltejs/kit";
import { listingSchema } from "$lib/schemas/listing.ts";
import { superValidate } from "sveltekit-superforms/server";
import { redirect } from "sveltekit-flash-message/server";

export const load = async (event) => {
    if (!event.locals.user) {
        throw redirect(302, "/login");
    }

    const form = await superValidate(event, listingSchema);
    return { 
        form
    };
}

export const actions = {
    create: async (event) => {
        const clonedRequest = event.request.clone();

        const form = await superValidate(event, listingSchema);
        console.log(form);
    
        const formData = await clonedRequest.formData();

        const images = formData.getAll("images");
        const test = formData.getAll("image");

        console.log(test);
        console.log(test.length);

        console.log("---");
        console.log(images);
        console.log(images.length);

        if (!form.valid) return fail(400, { form });
    }
}