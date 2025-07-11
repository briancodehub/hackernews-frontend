// tests/404.spec.ts
import { test, expect } from '@playwright/test';

test('shows 404 page on invalid route', async ({ page }) => {
  await page.goto('http://localhost:5173/non-existent-page');

  const heading = page.locator('h1');
  await expect(heading).toContainText('404');
});
