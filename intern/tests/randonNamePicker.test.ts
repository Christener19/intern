import { test, expect } from "@playwright/test";

test("should pick a random name", async ({ page }) => {
  // Navigate to the page where the NamePicker component is rendered
  await page.goto("http://localhost:3000/");

  // Click the "Pick" button
  await page.click("text=Pick");

  // Check if a name is displayed in the selected name area
  const selectedName = await page.textContent(".bg-blue-500.text-white");
  expect(selectedName).not.toBe("");
});
