import { formatCurrency } from '$lib/functions';
import { it, expect } from 'vitest';

it('formats currency correctly', () => {
    //Arrange
    const amount = 1000;

    //Act
    const result = formatCurrency(amount);

    //Assert
    expect(result).toBe('1,000');
});

it('handles zero correctly', () => {
    //Arrange
    const amount = 0;

    //Act
    const result = formatCurrency(amount);

    //Assert
    expect(result).toBe('0');
});

it('handles negative values correctly', () => {
    //Arrange
    const amount = -500;

    //Act
    const result = formatCurrency(amount);

    //Assert
    expect(result).toBe('-500');
});