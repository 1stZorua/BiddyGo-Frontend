import { test } from '@playwright/test';

test('login and logout', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('zorua@gmail.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('tests');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
});