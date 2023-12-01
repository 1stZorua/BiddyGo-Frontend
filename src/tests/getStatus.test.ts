import { getStatus } from '$lib/functions'; 
import type { Bid, LocalUser } from '$lib/types/types';
import { it, expect } from 'vitest';

it('returns "You\'ve won!" when the user is the highest bidder and the auction has ended', () => {
    //Arrange
    const currentBid : Bid = {
        id: "0",
        auction_listing_id: 0,
        bidder_id: 0,
        amount: 10,
        time: new Date(Date.now())
    }; 
    const remainingTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const user: LocalUser = {
        id: "0",
        email: "test@gmail.com",
        role: "user"
    };

    //Act
    const result = getStatus(currentBid, remainingTime, user);

    //Assert
    expect(result).toBe("You've won!");
});

it('returns "You\'re winning" when the user is the highest bidder and the auction is still active', () => {
    //Arrange
    const currentBid : Bid = {
        id: "0",
        auction_listing_id: 0,
        bidder_id: 0,
        amount: 10,
        time: new Date(Date.now())
    }; 
    const remainingTime = { days: 1, hours: 2, minutes: 30, seconds: 15 };
    const user: LocalUser = {
        id: "0",
        email: "test@gmail.com",
        role: "user"
    };

    //Act
    const result = getStatus(currentBid, remainingTime, user);

    //Assert
    expect(result).toBe("You're winning");
});

it('returns "Ended" when the user is not the highest bidder and the auction has ended', () => {
    //Arrange
    const currentBid : Bid = {
        id: "0",
        auction_listing_id: 0,
        bidder_id: 0,
        amount: 10,
        time: new Date(Date.now())
    };
    const remainingTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const user: LocalUser = {
        id: "1",
        email: "test@gmail.com",
        role: "user"
    };

    //Act
    const result = getStatus(currentBid, remainingTime, user);

    //Assert
    expect(result).toBe("Ended");
});

it('returns "Current Bid" when the user is not the highest bidder and the auction is still active', () => {
    //Arrange
    const currentBid : Bid = {
        id: "0",
        auction_listing_id: 0,
        bidder_id: 0,
        amount: 10,
        time: new Date(Date.now())
    }; 
    const remainingTime = { days: 1, hours: 2, minutes: 30, seconds: 15 };
    const user: LocalUser = {
        id: "1",
        email: "test@gmail.com",
        role: "user"
    };

    //Act
    const result = getStatus(currentBid, remainingTime, user);

    //Assert
    expect(result).toBe("Current Bid");
});