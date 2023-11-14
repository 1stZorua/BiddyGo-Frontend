import type { SuperValidated } from "sveltekit-superforms";
import type { BidSchema } from "$lib/schemas/bid.ts";

export interface RemainingTime {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}

export type ViewData = {
    formData: SuperValidated<BidSchema>, 
    auctionListing: AuctionListing,
    auctionListingImages: Image[],
    currentBid: Bid,
    bidHistory: Bid[],
    remainingTime: RemainingTime
};

export interface AuctionListing {
    id: number,
    subCategoryId: number,
    title: string,
    description: string,
    startingBid: number,
    reservePrice: number,
    startTime: Date,
    endTime: Date,
    sellerId: number,
    remainingTime: RemainingTime
}

export interface Bid { 
    id: string,
    auction_listing_id: number,
    bidder_id: number,
    amount: number,
    formatted_amount?: string;
    time: Date
}

export interface Category {
    id: number,
    name: string
}

export interface Image {
    fileContents: string,
    contentType: string,
}

export interface SubCategory {
    id: number,
    name: string,
    imageId: number,
    categoryId: number
}

export interface User {
    id?: number,
    email: string,
    password: string
}
