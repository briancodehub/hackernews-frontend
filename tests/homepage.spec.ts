import { test, expect } from '@playwright/test';

test.describe('Hacker News Frontend', () => {

  test('homepage has correct title', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page).toHaveTitle(/Hacker News/i);
  });

  test('shows header text', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('h1')).toContainText(/Hacker News/i);
  });

});
