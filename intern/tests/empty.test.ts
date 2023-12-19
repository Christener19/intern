import { test, expect } from "@playwright/test";

test("setup to test if runs", async ({ page }) => {
  // This is an empty test that does nothing.
  // It's just to check that the Playwright setup is working.
  await expect(page).not.toBeNull();
});
