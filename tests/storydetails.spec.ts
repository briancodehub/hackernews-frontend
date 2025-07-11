// tests/storydetails.spec.ts
import { test, expect } from '@playwright/test';

test('navigates to story detail', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const firstStoryLink = page.locator('.story-item a').first();
  await firstStoryLink.click();

  // Wait for detail page to render
  await expect(page).toHaveURL(/\/story\/\d+/);

  const title = page.locator('.story-title');
  await expect(title).toBeVisible();
});
