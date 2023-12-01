import { test } from '@playwright/test';

test('View latest auction listing', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('section').filter({ hasText: 'Auctioning quality items' }).getByRole('link').nth(1).waitFor();
    await page.locator('section').filter({ hasText: 'Auctioning quality items' }).getByRole('link').nth(1).click();
});