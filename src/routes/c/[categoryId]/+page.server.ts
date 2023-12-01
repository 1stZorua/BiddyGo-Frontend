import type { PageServerLoad } from "./$types";
import type { SubCategory } from "$lib/types/types";
import { fetchMultipleRequests } from "$lib/functions";

export const load: PageServerLoad = async (event) => {
    const categoryId = event.params.categoryId;

    const [category, subCategories] = await fetchMultipleRequests(
        [
            {url: `/api/Category/${categoryId}`, method: "GET"},
            {url: `/api/Category/subcategories/${categoryId}`, method: "GET"}
        ]
    );

    const auctionListings = await fetchMultipleRequests(
        (subCategories as SubCategory[]).map(subCategory => ({
            url: `/api/AuctionListing/subcategories/${subCategory.id}`,
            method: "GET"
        }))
    );

    return {
        category,
        subCategories,
        auctionListings
    }
}