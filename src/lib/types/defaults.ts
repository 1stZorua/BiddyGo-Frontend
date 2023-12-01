import type { AuctionListing, Bid, Category, RemainingTime, SubCategory, User } from "./types";

export const defaultAuctionListing: AuctionListing = {
    id: 0,
    subCategoryId: 0,
    title: "Pokemon - PSA 8 graded Pokemon Lugia Holo Vintage Card",
    description: "placeholder",
    startingBid: 100,
    reservePrice: 0,
    startTime: new Date('2023-07-11T00:00:00'),
    endTime: new Date('2023-07-11T00:00:00'),
    sellerId: 0
};

export const defaultRemainingTime : RemainingTime = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
};

export const defaultBid: Bid = {
    id: "",
    auction_listing_id: 0,
    bidder_id: 0,
    amount: 0,
    formatted_amount: "0",
    time: new Date(Date.now())
};

export const defaultCategory: Category = {
    id: 0,
    name: "Entertainment, Cards & Games"
}

export const defaultSubCategory: SubCategory = {
    id: 0,
    name: "Pokemon & Trading Cards",
    imageId: 0,
    categoryId: 0
}

export const defaultUser: User = {
    id: 0,
    email: "default@gmail.com",
}