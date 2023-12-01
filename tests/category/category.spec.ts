import { test } from '@playwright/test';

test('View category', async ({ page }) => {
  await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Entertainment, Cards & Games' }).waitFor();
    await page.getByRole('link', { name: 'Entertainment, Cards & Games' }).click();
});

test('View all auctions listings of subcategory', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1');
    await page.getByRole('link', { name: 'Pokemon & Trading Cards' }).waitFor();
    await page.getByRole('link', { name: 'Pokemon & Trading Cards' }).click();
    await page.getByRole('link', { name: 'View All' }).click();
});

test('View auction listing', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1');
    await page.getByRole('link', { name: 'Pokemon & Trading Cards' }).waitFor();
    await page.getByRole('link', { name: 'Pokemon & Trading Cards' }).click();
    await page.getByRole('link', { name: '0 WOTC Pokémon - 1 Graded' }).waitFor();
    await page.getByRole('link', { name: '0 WOTC Pokémon - 1 Graded' }).click();
});

test('Trying to favorite an auction listing', async ({ page }) => {
    await page.goto('http://localhost:5173/c/1');
    await page.getByRole('link', { name: 'Pokemon & Trading Cards' }).waitFor();
    await page.getByRole('link', { name: 'Pokemon & Trading Cards' }).click();
    await page.getByRole('link', { name: '0 WOTC Pokémon - 1 Graded' }).waitFor();
    await page.getByRole('button', { name: '0' }).nth(1).waitFor()
    await page.getByRole('button', { name: '0' }).nth(1).click();
});