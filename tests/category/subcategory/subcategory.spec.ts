import { test } from '@playwright/test';

test('Sort auction listings by time remaining', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1/1');
    await page.getByRole('button', { name: 'Sort by time remaining' }).waitFor();
    await page.getByRole('button', { name: 'Sort by time remaining' }).click();
});

test('Change formatting of auction listings', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1/1');
    await page.locator('section').filter({ hasText: 'BiddyGo > 1 > 1 Pokemon &' }).getByRole('button').nth(2).waitFor();
    await page.locator('section').filter({ hasText: 'BiddyGo > 1 > 1 Pokemon &' }).getByRole('button').nth(2).click();
    await page.locator('section').filter({ hasText: 'BiddyGo > 1 > 1 Pokemon &' }).getByRole('button').nth(1).click();
});

test('View auction listing', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1/1');
    await page.getByRole('link', { name: '0 WOTC Pokémon - 1 Graded' }).waitFor();
    await page.getByRole('link', { name: '0 WOTC Pokémon - 1 Graded' }).click();
});

test('Trying to favorite an auction listing', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1/1');
    await page.getByRole('button', { name: '0' }).nth(1).waitFor();
    await page.getByRole('button', { name: '0' }).nth(1).click();
});