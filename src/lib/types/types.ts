export interface Category {
    id: number,
    name: string
}

export interface SubCategory {
    id: number,
    name: string,
    imageId: number,
    categoryId: number
}

export interface AuctionListing {
    id: number,
    subCategoryId: number,
    title: string,
    description: string,
    startingBid: number,
    reservePrice: number,
    startTime: Date,
    endTime: Date,
    sellerId: number
}

export interface User {
    id: number,
    email: string
}

export interface Image {
    fileContents: string,
    contentType: string,
}