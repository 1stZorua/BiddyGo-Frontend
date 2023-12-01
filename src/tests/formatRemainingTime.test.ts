import { formatRemainingTime } from '$lib/functions'; 
import { it, expect } from 'vitest';

it('formats remaining time in the default format', () => {
    // Arrange
    const remainingTime = { days: 2, hours: 12, minutes: 30, seconds: 15 };

    // Act
    const result = formatRemainingTime(remainingTime);

    // Assert
    expect(result).toBe('2d 12h 30m 15s');
});

it('formats remaining time in the short format', () => {
    // Arrange
    const remainingTime = { days: 0, hours: 8, minutes: 45, seconds: 30 };
  
    // Act
    const result = formatRemainingTime(remainingTime, 'short');
  
    // Assert
    expect(result).toBe('8h');
});
  
it('formats remaining time in the other format', () => {
    // Arrange
    const remainingTime = { days: 1, hours: 5, minutes: 15, seconds: 45 };
  
    // Act
    const result = formatRemainingTime(remainingTime, 'other');
  
    // Assert
    expect(result).toBe('1 day');
});