import { sendRequest } from "$lib/functions/index.js";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import type { AuctionListing } from "$lib/types/types.js";

export const load: PageServerLoad = async (event) => {
    const subCategoryId = event.params.subCategoryId;
    const page = Number(event.url.searchParams.get("page")) || 1
    const pageSize = Number(event.url.searchParams.get("pageSize")) || 10;

    const subCategory = await sendRequest(`/api/SubCategory/${subCategoryId}`, "GET");

    async function getAuctionListings(page: number = 1, pageSize: number = 10) {
        if (pageSize > 50) {
            throw error(400, "Bad Request");
        }
        const result = await sendRequest(`/api/AuctionListing/subcategories/${subCategoryId}?page=${page}&pageSize=${pageSize}`, "GET");
        return result as AuctionListing[];
    }

    const auctionListings = await getAuctionListings(page, pageSize);
    return { 
        subCategory,
        auctionListings: auctionListings
    };
}