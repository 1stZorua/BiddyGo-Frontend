import { test } from '@playwright/test';

test('Trying to favorite an auction listing', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1/1/1');
    await page.getByRole('button', { name: '0' }).nth(1).waitFor();
    await page.getByRole('button', { name: '0' }).nth(1).click();
});

test('Trying to place a bid', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1/1/1');
    await page.getByRole('button', { name: 'Place Bid' }).waitFor();
    await page.getByRole('button', { name: 'Place Bid' }).click();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').fill('100000');
    await page.getByRole('button', { name: 'Place Bid' }).nth(1).click();
});

test('Toggle fullscreen gallery', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1/1/1');
    await page.getByRole('button', { name: '+1 test' }).waitFor();
    await page.getByRole('button', { name: '+1 test' }).click();
    await page.locator('button:nth-child(3) > .s-Q5Nz6BVtqvxL').click();
    await page.locator('button:nth-child(3) > .s-Q5Nz6BVtqvxL').click();
    await page.locator('.s-Q5Nz6BVtqvxL').first().click();
    await page.locator('.s-Q5Nz6BVtqvxL').first().click();
    await page.locator('div:nth-child(2) > button').first().click();
});

test('View bid history', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1/1/1');
    await page.locator('button').filter({ hasText: /^Bid History$/ }).waitFor();
    await page.locator('button').filter({ hasText: /^Bid History$/ }).click();
    await page.getByRole('heading', { name: 'Bid History' }).click();
});