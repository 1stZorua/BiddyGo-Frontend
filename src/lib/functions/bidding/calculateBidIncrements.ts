export function calculateBidIncrements(currentBid: number) {
    let increments;

    if (currentBid < 500) {
        increments = [10, 20, 30];
    } else if (currentBid < 1000) {
        increments = [20, 40, 60];
    } else if (currentBid < 1500) {
        increments = [50, 100, 150];
    } else {
        increments = [100, 200, 300];
    }

    return increments.map(increment => currentBid + increment);
}