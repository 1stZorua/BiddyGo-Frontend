import { formatCurrency } from '$lib/tests/formatCurrency';
import { it, expect } from 'vitest';

it('Adds the $ before the given number', () => {
    const result = formatCurrency(10);
    expect(result).toBe('$10');
});