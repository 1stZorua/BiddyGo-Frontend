import { getStatus } from '$lib/functions'; 
import type { Bid, LocalUser, RemainingTime } from '$lib/types/types';
import { it, expect } from 'vitest';

const createTestSetup = (days: number, hours: number, minutes: number, seconds: number, userId: string): { currentBid: Bid, remainingTime: RemainingTime, user: LocalUser } => {
    const currentBid: Bid = {
        id: "0",
        auction_listing_id: 0,
        bidder_id: 0,
        amount: 10,
        time: new Date(Date.now())
    };
    const remainingTime: RemainingTime = { days: days, hours: hours, minutes: minutes, seconds: seconds };
    const user: LocalUser = {
        id: userId,
        email: "test@gmail.com",
        role: "user"
    };
    return { currentBid, remainingTime, user };
};

it('returns "You\'ve won!" when the user is the highest bidder and the auction has ended', () => {
    const { currentBid, remainingTime, user } = createTestSetup(0, 0, 0, 0, "0");
    const result = getStatus(currentBid, remainingTime, user);
    expect(result).toBe("You've won!");
});

it('returns "You\'re winning" when the user is the highest bidder and the auction is still active', () => {
    const { currentBid, remainingTime, user } = createTestSetup(1, 2, 30, 15, "0");
    const result = getStatus(currentBid, remainingTime, user);
    expect(result).toBe("You're winning");
});

it('returns "Ended" when the user is not the highest bidder and the auction has ended', () => {
    const { currentBid, remainingTime, user } = createTestSetup(0, 0, 0, 0, "1");
    const result = getStatus(currentBid, remainingTime, user);
    expect(result).toBe("Ended");
});

it('returns "Current Bid" when the user is not the highest bidder and the auction is still active', () => {
    const { currentBid, remainingTime, user } = createTestSetup(1, 2, 30, 15, "1");
    const result = getStatus(currentBid, remainingTime, user);
    expect(result).toBe("Current Bid");
});