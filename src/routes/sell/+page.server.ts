import { fail } from "@sveltejs/kit";
import { listingSchema } from "$lib/schemas/listing.ts";
import { superValidate } from "sveltekit-superforms/server";
import { fetchMultipleRequests, sendRequest } from "$lib/functions/index.js";
import type { AuctionListing } from "$lib/types/types.js";
import { redirect } from "sveltekit-flash-message/server";
import { API_URL } from "$lib/functions/index.js";

export const load = async (event) => {
    if (!event.locals.user) {
        throw redirect(302, "/login");
    }

    const [categories, subCategories] = await fetchMultipleRequests(
        [
            { url: "/api/Category", method: "GET" },
            { url: "/api/SubCategory", method: "GET" }
        ]
    );

    const form = await superValidate(event, listingSchema);
    return { 
        form,
        categories,
        subCategories
    };
}

export const actions = {
    create: async (event) => {
        const clonedRequest = event.request.clone();
        const form = await superValidate(event, listingSchema);
        const formData = await clonedRequest.formData();
        const images = formData.getAll("image");

        const test = new FormData();

        images.forEach((image) => {
            test.append("image", image);
        });


        if (!form.valid) return fail(400, { form });

        const auctionListing: AuctionListing = {
            title: form.data.title,
            description: form.data.description,
            subCategoryId: form.data.subCategoryId,
            sellerId: Number(event.locals.user.id),
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            startingBid: 0,
        }

        const result = await sendRequest<AuctionListing, AuctionListing>("/api/AuctionListing", "POST", auctionListing);
        await fetch(`${API_URL}/api/AuctionListing/images/${result.id}`, {
            method: 'POST',
            body: formData,
        });

        throw redirect(
            302,
            "/login",
            {
                type: "success",
                message: "Successfully created auction listing.",
            },
            event,
        );
    }
}