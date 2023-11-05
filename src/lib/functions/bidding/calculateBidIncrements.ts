export function calculateBidIncrements(currentBid: number) {
    const increments = currentBid < 500
        ? [10, 20, 30]
        : currentBid < 1000
        ? [20, 40, 60]
        : currentBid < 1500
        ? [50, 100, 150]
        : [100, 200, 300];
        
    return increments.map(increment => currentBid + increment);
}