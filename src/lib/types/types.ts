import type { SuperValidated } from "sveltekit-superforms";
import type { BidSchema } from "$lib/schemas/bid.ts";
import type { ListingSchema } from "$lib/schemas/listing";

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
    remainingTime: RemainingTime,
    bidText: string,
    favorites: number[]
};

export type ViewSubCategoryData = {
    subCategory: SubCategory,
    auctionListings: AuctionListings
}

export type SellData = {
    form: SuperValidated<ListingSchema>,
    categories: Categories,
    subCategories: SubCategories
}

export type IndexData = {
    categories: Categories,
    latestAuctionListing: AuctionListings
}

export interface AuctionListing {
    id?: number,
    subCategoryId: number,
    title: string,
    description: string,
    startingBid: number,
    reservePrice?: number,
    startTime: Date,
    endTime: Date,
    sellerId: number,
}

export interface AuctionListings {
    data: AuctionListing[],
    totalCount: number
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

export interface Categories {
    data: Category[],
    totalCount: number
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

export interface SubCategories {
    data: SubCategory[],
    totalCount: number
}

export interface User {
    id?: number,
    email: string,
    password: string
}

export interface Users {
    data: User[],
    totalCount: number
}

export interface LocalUser {
    id: string,
    email: string,
    role: string
}

export interface Favorite {
    auctionListingId: number | undefined,
    userId: number
}

export interface View {
    auctionListingId: number | undefined,
    userId: number
}

export interface CallbackMap {
    [key: string]: (...args: object[]) => void;
};