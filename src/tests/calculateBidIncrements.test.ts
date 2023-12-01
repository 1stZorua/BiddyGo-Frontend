import { it, expect } from 'vitest';
import { calculateBidIncrements } from '$lib/functions';

it('calculates bid increments correctly for a bid less than 500', () => {
    //Arrange
    const currentBid = 400;

    //Act
    const result = calculateBidIncrements(currentBid);

    //Assert
    expect(result).toEqual([410, 420, 430]);
});

it('calculates bid increments correctly for a bid between 500 and 1000', () => {
    //Arrange
    const currentBid = 800;

    //Act
    const result = calculateBidIncrements(currentBid);

    //Assert
    expect(result).toEqual([820, 840, 860]);
});