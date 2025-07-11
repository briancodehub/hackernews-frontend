// tests/topstories.spec.ts
import { test, expect } from '@playwright/test';

test('top stories are visible', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Wait for stories list to load (adjust selector to your app)
  const storyList = page.locator('.top-stories-list');
  await expect(storyList).toBeVisible();

  // Check at least one story
  const stories = storyList.locator('.story-item');
  await expect(stories.first()).toBeVisible();
});
