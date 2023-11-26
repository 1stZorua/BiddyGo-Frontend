import { fetchMultipleRequests } from "$lib/functions/index.js";

export const load = async () => {
    const [ categories, latestAuctionListing ] = await fetchMultipleRequests([
        { url: "/api/Category", method: "GET" },
        { url: "/api/AuctionListing?pageSize=1&order=desc", method: "GET" }
    ])

    return { 
        categories,
        latestAuctionListing
    };
}