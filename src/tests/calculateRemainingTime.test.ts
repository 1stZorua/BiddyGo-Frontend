import { calculateRemainingTime } from '$lib/functions'; 
import { it, expect } from 'vitest';

it('returns remaining time when endTime is in the future', () => {
    // Arrange
    const endTime = new Date().getTime() + 3600000;

    // Act
    const result = calculateRemainingTime(endTime);

    // Assert
    expect(result).toEqual({ days: 0, hours: 1, minutes: 0, seconds: 0 });
});

it('returns zero remaining time when endTime is in the past', () => {
    // Arrange
    const endTime = new Date().getTime() - 3600000; 

    // Act
    const result = calculateRemainingTime(endTime);

    // Assert
    expect(result).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
});

it('returns opposite remaining time when opposite parameter is true', () => {
    // Arrange
    const endTime = new Date().getTime() - 3600000; 
    // Act
    const result = calculateRemainingTime(endTime, true);

    // Assert
    expect(result).toEqual({ days: 0, hours: 1, minutes: 0, seconds: 0 });
});