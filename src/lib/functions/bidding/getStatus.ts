import type { Bid, LocalUser, RemainingTime } from "$lib/types/types";

export function getStatus(currentBid: Bid, remainingTime: RemainingTime, user: LocalUser | undefined) {
    if (currentBid?.bidder_id === Number(user?.id)) {
        return (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) ? "You've won!" : "You're winning";
    }
    return (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) ? "Ended" : "Current Bid";
}