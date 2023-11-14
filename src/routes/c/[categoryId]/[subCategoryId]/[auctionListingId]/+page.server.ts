import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { bidSchema } from "$lib/schemas/bid";
import { fetchMultipleRequests } from "$lib/functions/index.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async (event) => {
    const auctionListingId = event.params.auctionListingId;
    const formData = await superValidate(event, bidSchema);
    const [auctionListing, auctionListingImages, currentBid, bidHistory] = await fetchMultipleRequests(
        [
            { url: `/api/AuctionListing/${auctionListingId}`, method: "GET" },
            { url: `/api/AuctionListing/images/${auctionListingId}`, method: "GET" },
            { url: `/api/Bid/highest/${auctionListingId}`, method: "GET" },
            { url: `/api/Bid/${auctionListingId}`, method: "GET" }
        ]
    );
    return { 
        formData,
        auctionListing,
        auctionListingImages, 
        currentBid,
        bidHistory
    };
}

export const actions = {
    bid: async (event) => {
        const form = await superValidate(event, bidSchema);
        console.log(form);

        if (!form.valid) return fail(400, { form });
    },
}