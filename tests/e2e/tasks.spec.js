const { test, expect } = require('@playwright/test');

test('login and add task flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[label="Email"]', 'user@example.com');
  await page.fill('input[label="Password"]', 'password');
  await page.click('text=Login');
  await page.waitForURL('/dashboard');

  await page.goto('/tasks');
  await page.fill('input[placeholder="New task"]', 'E2E Task');
  await page.click('text=Add');
  await page.waitForSelector('text=E2E Task');
  expect(await page.locator('text=E2E Task').count()).toBeGreaterThan(0);
});
