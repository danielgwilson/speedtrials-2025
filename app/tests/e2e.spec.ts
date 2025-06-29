import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Georgia Public Trust & Compliance Platform/);
});

test("can search for an address", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Fill the input and click the button.
  await page.fill('input[type="text"]', "123 Main St");
  await page.click('button[type="submit"]');

  // Expect to be on the system page.
  await expect(page).toHaveURL(/.*system/);

  // Expect to see the system name.
  await expect(page.locator("text=ATLANTA WATER SYSTEM")).toBeVisible();
});
